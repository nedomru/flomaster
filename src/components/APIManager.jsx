import React, { useState, useEffect } from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import { supabase } from "@/lib/supabase";

const APIManager = () => {
  const [phrases, setPhrases] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [newSubcategory, setNewSubcategory] = useState('');
  const [newPhraseKey, setNewPhraseKey] = useState('');
  const [newPhraseValue, setNewPhraseValue] = useState('');
  const [newPhraseTag, setNewPhraseTag] = useState('');
  const [editingPhraseId, setEditingPhraseId] = useState(null);
  const [editedPhraseValue, setEditedPhraseValue] = useState('');
  const [editedPhraseTag, setEditedPhraseTag] = useState('');

  // Group phrases by category, subcategory, and phrase_key
  const groupedPhrases = phrases.reduce((acc, phrase) => {
    const {category, subcategory, phrase_key, ...rest} = phrase;
    if (!acc[category]) {
      acc[category] = {};
    }
    if (!acc[category][subcategory]) {
      acc[category][subcategory] = {};
    }
    if (!acc[category][subcategory][phrase_key]) {
      acc[category][subcategory][phrase_key] = [];
    }
    acc[category][subcategory][phrase_key].push({...rest, category, subcategory, phrase_key});
    return acc;
  }, {});
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [phraseKeys, setPhraseKeys] = useState([]);
  const [selectedTags, setSelectedTags] = useState({});

  // Custom inputs state
  const [customCategory, setCustomCategory] = useState('');
  const [customSubcategory, setCustomSubcategory] = useState('');
  const [customPhraseKey, setCustomPhraseKey] = useState('');
  const [customTag, setCustomTag] = useState('');

  // Filtered options state
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [filteredPhraseKeys, setFilteredPhraseKeys] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);

  // Error state
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPhrases();
  }, []);

  useEffect(() => {
    if (phrases.length > 0) {
      // Extract unique categories
      const uniqueCategories = [...new Set(phrases.map(phrase => phrase.category))];
      setCategories(uniqueCategories);
    }
  }, [phrases]);

  // Update filtered subcategories when category changes
  useEffect(() => {
    if (newCategory && newCategory !== 'new') {
      const categoryPhrases = phrases.filter(phrase => phrase.category === newCategory);
      const uniqueSubcategories = [...new Set(categoryPhrases.map(phrase => phrase.subcategory))];
      setFilteredSubcategories(uniqueSubcategories);

      // Reset subcategory selection when category changes
      setNewSubcategory('');
      setNewPhraseKey('');
      setNewPhraseTag('');
    } else {
      setFilteredSubcategories([]);
    }
  }, [newCategory, phrases]);

  // Update filtered phrase keys when subcategory changes
  useEffect(() => {
    if (newCategory && newSubcategory && newSubcategory !== 'new') {
      const relevantPhrases = phrases.filter(
          phrase => phrase.category === newCategory && phrase.subcategory === newSubcategory
      );
      const uniquePhraseKeys = [...new Set(relevantPhrases.map(phrase => phrase.phrase_key))];
      setFilteredPhraseKeys(uniquePhraseKeys);

      // Reset phrase key selection when subcategory changes
      setNewPhraseKey('');
      setNewPhraseTag('');
    } else {
      setFilteredPhraseKeys([]);
    }
  }, [newCategory, newSubcategory, phrases]);

  // Update filtered tags when phrase key changes
  useEffect(() => {
    if (newCategory && newSubcategory && newPhraseKey && newPhraseKey !== 'new') {
      const relevantPhrases = phrases.filter(
          phrase =>
              phrase.category === newCategory &&
              phrase.subcategory === newSubcategory &&
              phrase.phrase_key === newPhraseKey
      );
      const uniqueTags = [...new Set(relevantPhrases.map(phrase => phrase.tag))];
      setFilteredTags(uniqueTags);
    } else {
      setFilteredTags([]);
    }
  }, [newCategory, newSubcategory, newPhraseKey, phrases]);

  const fetchPhrases = async () => {
    try {
      const response = await fetch('/api/phrases');
      const data = await response.json();
      setPhrases(data);

      const initialSelectedTags = {};
      data.forEach(phrase => {
        if (!initialSelectedTags[phrase.phrase_key]) {
          initialSelectedTags[phrase.phrase_key] = phrase.id;
        }
      });
      setSelectedTags(initialSelectedTags);
    } catch (error) {
      console.error('Ошибка получения РМов:', error);
    }
  };

  // Reset form helper
  const updatePhrase = async (id) => {
    try {
      const session = await supabase.auth.getSession();
      const userEmail = session.data.session.user.email;
      const currentTime = new Date().toISOString();

      const response = await fetch('/api/phrases', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id,
          phrase_value: editedPhraseValue,
          tag: editedPhraseTag,
          edited_by: userEmail,
          last_edit_time: currentTime,
        }),
      });
      await response.json();
      setEditingPhraseId(null);
      setEditedPhraseValue('');
      setEditedPhraseTag('');
      await fetchPhrases();
    } catch (error) {
      console.error('Ошибка обновления РМа:', error);
    }
  };

  const deletePhrase = async (id, category, subcategory, phrase_key, phrase_value, tag) => {
    if (window.confirm('Ты уверен, что хочешь удалить РМ?')) {
      try {
        await fetch('/api/phrases', {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id,
            category,
            subcategory,
            phrase_key,
            phrase_value,
            tag
          })
        });
        await fetchPhrases();
      } catch (error) {
        console.error('Ошибка удаления РМа:', error);
      }
    }
  };

  const resetForm = () => {
    setNewCategory('');
    setNewSubcategory('');
    setNewPhraseKey('');
    setNewPhraseValue('');
    setNewPhraseTag('');
    setCustomCategory('');
    setCustomSubcategory('');
    setCustomPhraseKey('');
    setCustomTag('');
    setError('');
  };

  // Form submission handler
  const addPhrase = async () => {
    try {
      setError('');

      const categoryValue = newCategory === 'new' ? customCategory : newCategory;
      const subcategoryValue = newSubcategory === 'new' ? customSubcategory : newSubcategory;
      const phraseKeyValue = newPhraseKey === 'new' ? customPhraseKey : newPhraseKey;
      const tagValue = newPhraseTag === 'new' ? customTag : newPhraseTag;

      if (!categoryValue || !subcategoryValue || !phraseKeyValue || !newPhraseValue) {
        setError('Заполни все обязательные поля перед добавлением');
        return;
      }

      const session = await supabase.auth.getSession();
      const userEmail = session.data.session.user.email;

      const currentTime = new Date().toISOString();

      const response = await fetch('/api/phrases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: categoryValue,
          subcategory: subcategoryValue,
          phrase_key: phraseKeyValue,
          phrase_value: newPhraseValue,
          tag: tagValue || 'default',
          created_by: userEmail,
          last_edit_time: currentTime,
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при добавлении РМа');
      }

      await response.json();
      await fetchPhrases();

      setError('РМ успешно добавлен!');
      setTimeout(() => setError(''), 2000);
    } catch (error) {
      console.error('Ошибка добавления РМа:', error);
      setError('Произошла ошибка при добавлении РМа. Пожалуйста, попробуйте еще раз.');
    }
  };

  return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-white">Добавить новый РМ</h2>
          {error && (
              <div className={`p-3 rounded-md mb-4 ${
                  error === 'РМ успешно добавлен!'
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
              }`}>
                {error}
              </div>
          )}

          {/* Category Select */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Категория: <span className="text-red-500">*</span>
            </label>
            <select
                className="w-full p-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                required
            >
              <option value="">Выберите категорию</option>
              {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
              ))}
              <option value="new">Добавить новую категорию</option>
            </select>
            {newCategory === 'new' && (
                <input
                    type="text"
                    className="w-full mt-2 p-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Введите новую категорию"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    required
                />
            )}
          </div>

          {/* Subcategory Select */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Подкатегория: <span className="text-red-500">*</span>
            </label>
            <select
                className="w-full p-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500"
                value={newSubcategory}
                onChange={(e) => setNewSubcategory(e.target.value)}
                required
                disabled={!newCategory}
            >
              <option value="">Выберите подкатегорию</option>
              {filteredSubcategories.map((subcat) => (
                  <option key={subcat} value={subcat}>{subcat}</option>
              ))}
              <option value="new">Добавить новую подкатегорию</option>
            </select>
            {newSubcategory === 'new' && (
                <input
                    type="text"
                    className="w-full mt-2 p-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Введите новую подкатегорию"
                    value={customSubcategory}
                    onChange={(e) => setCustomSubcategory(e.target.value)}
                    required
                />
            )}
          </div>

          {/* Phrase Key Select */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Название: <span className="text-red-500">*</span>
            </label>
            <select
                className="w-full p-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500"
                value={newPhraseKey}
                onChange={(e) => setNewPhraseKey(e.target.value)}
                required
                disabled={!newSubcategory}
            >
              <option value="">Выберите название</option>
              {filteredPhraseKeys.map((key) => (
                  <option key={key} value={key}>{key}</option>
              ))}
              <option value="new">Добавить новое название</option>
            </select>
            {newPhraseKey === 'new' && (
                <input
                    type="text"
                    className="w-full mt-2 p-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Введите новое название"
                    value={customPhraseKey}
                    onChange={(e) => setCustomPhraseKey(e.target.value)}
                    required
                />
            )}
          </div>

          {/* Phrase Value Textarea */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Текст: <span className="text-red-500">*</span>
            </label>
            <textarea
                className="w-full p-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500"
                rows={4}
                value={newPhraseValue}
                onChange={(e) => setNewPhraseValue(e.target.value)}
                required
            />
          </div>

          {/* Tag Select */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Тег:
            </label>
            <select
                className="w-full p-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500"
                value={newPhraseTag}
                onChange={(e) => setNewPhraseTag(e.target.value)}
                disabled={!newPhraseKey}
            >
              <option value="">Выберите тег</option>
              {filteredTags.map((tag) => (
                  <option key={tag} value={tag}>{tag}</option>
              ))}
              <option value="new">Добавить новый тег</option>
            </select>
            {newPhraseTag === 'new' && (
                <input
                    type="text"
                    className="w-full mt-2 p-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Введите новый тег"
                    value={customTag}
                    onChange={(e) => setCustomTag(e.target.value)}
                />
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition duration-300 ease-in-out"
                onClick={addPhrase}
            >
              Добавить РМ
            </button>
            <button
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-md transition duration-300 ease-in-out"
                onClick={resetForm}
            >
              Очистить форму
            </button>
          </div>
        </div>
        {/* Existing Phrases Display */}
        <div>
          {Object.entries(groupedPhrases).map(([category, subcategories]) => (
              <Disclosure key={category} as="div" className="mb-4">
                {({open}) => (
                    <>
                      <Disclosure.Button
                          className="flex justify-between w-full px-4 py-2 text-lg font-medium text-left text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                        <span>{category}</span>
                        <ChevronUpIcon
                            className={`${
                                open ? 'transform rotate-180' : ''
                            } w-5 h-5 text-white transition-transform duration-300`}
                        />
                      </Disclosure.Button>
                      <Transition
                          enter="transition duration-300 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-200 ease-in"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                      >
                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-300">
                          {Object.entries(subcategories).map(([subcategory, phraseKeys]) => (
                              <Disclosure key={subcategory} as="div" className="mb-2">
                                {({open}) => (
                                    <>
                                      <Disclosure.Button
                                          className="flex justify-between w-full px-4 py-2 text-base font-medium text-left text-white bg-gray-700 rounded-lg hover:bg-gray-600 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                                        <span>{subcategory}</span>
                                        <ChevronUpIcon
                                            className={`${
                                                open ? 'transform rotate-180' : ''
                                            } w-5 h-5 text-white transition-transform duration-300`}
                                        />
                                      </Disclosure.Button>
                                      <Transition
                                          enter="transition duration-300 ease-out"
                                          enterFrom="transform scale-95 opacity-0"
                                          enterTo="transform scale-100 opacity-100"
                                          leave="transition duration-200 ease-in"
                                          leaveFrom="transform scale-100 opacity-100"
                                          leaveTo="transform scale-95 opacity-0"
                                      >
                                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-300">
                                          {Object.entries(phraseKeys).map(([phraseKey, phraseInstances]) => (
                                              <div key={phraseKey}
                                                   className="mb-4 bg-gray-800 rounded-lg p-4 shadow-lg transition-all duration-300 hover:shadow-xl">
                                                <h3 className="text-xl font-semibold text-white mb-2">{phraseKey}</h3>
                                                <div className="flex flex-wrap gap-2 mb-2">
                                                  {phraseInstances.map((phrase) => (
                                                      <button
                                                          key={phrase.id}
                                                          className={`px-2 py-1 rounded ${
                                                              selectedTags[phraseKey] === phrase.id ? 'bg-blue-500' : 'bg-gray-600'
                                                          } hover:bg-blue-600 transition-colors duration-300`}
                                                          onClick={() => setSelectedTags({
                                                            ...selectedTags,
                                                            [phraseKey]: phrase.id
                                                          })}
                                                      >
                                                        {phrase.tag}
                                                      </button>
                                                  ))}
                                                </div>
                                                {phraseInstances.map((phrase) => (
                                                    phrase.id === selectedTags[phraseKey] && (
                                                        <div key={phrase.id}>
                                                          <p className="text-white mb-2">{phrase.phrase_value}</p>
                                                          <p className="text-gray-400 mb-2">Создал: {phrase.created_by}</p>
                                                          <p className="text-gray-400 mb-2">
                                                            Последнее редактирование: {new Date(phrase.last_edit_time).toLocaleString()}
                                                          </p>
                                                          <button
                                                              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2 transition-colors duration-300"
                                                              onClick={() => {
                                                                setEditingPhraseId(phrase.id);
                                                                setEditedPhraseValue(phrase.phrase_value);
                                                                setEditedPhraseTag(phrase.tag);
                                                              }}
                                                          >
                                                            Редактировать
                                                          </button>
                                                          <button
                                                              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors duration-300"
                                                              onClick={() => deletePhrase(phrase.id, category, subcategory, phraseKey, phrase.phrase_value, phrase.tag)}
                                                          >
                                                            Удалить
                                                          </button>
                                                        </div>
                                                    )
                                                ))}
                                                {editingPhraseId === selectedTags[phraseKey] && (
                                                    <div>
                                        <textarea
                                            className="w-full p-2 bg-gray-700 text-white rounded mb-2"
                                            value={editedPhraseValue}
                                            onChange={(e) => setEditedPhraseValue(e.target.value)}
                                        ></textarea>
                                                      <select
                                                          className="w-full p-2 bg-gray-700 text-white rounded mb-2"
                                                          value={editedPhraseTag}
                                                          onChange={(e) => setEditedPhraseTag(e.target.value)}
                                                      >
                                                        {tags.map((tag) => (
                                                            <option key={tag} value={tag}>{tag}</option>
                                                        ))}
                                                      </select>
                                                      <button
                                                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2 transition-colors duration-300"
                                                          onClick={() => updatePhrase(editingPhraseId)}
                                                      >
                                                        Сохранить
                                                      </button>
                                                      <button
                                                          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors duration-300"
                                                          onClick={() => setEditingPhraseId(null)}
                                                      >
                                                        Отмена
                                                      </button>
                                                    </div>
                                                )}
                                              </div>
                                          ))}
                                        </Disclosure.Panel>
                                      </Transition>
                                    </>
                                )}
                              </Disclosure>
                          ))}
                        </Disclosure.Panel>
                      </Transition>
                    </>
                )}
              </Disclosure>
          ))}
        </div>
      </div>
  );
};

export default APIManager;