import React, {useState, useEffect} from 'react';
import {Disclosure, Transition} from '@headlessui/react';
import {ChevronUpIcon} from '@heroicons/react/24/solid';
import {supabase} from "@/lib/supabase";

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
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [phraseKeys, setPhraseKeys] = useState([]);
  const [selectedTags, setSelectedTags] = useState({});

  // State for custom inputs
  const [customCategory, setCustomCategory] = useState('');
  const [customSubcategory, setCustomSubcategory] = useState('');
  const [customPhraseKey, setCustomPhraseKey] = useState('');
  const [customTag, setCustomTag] = useState('');

  // Error state
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPhrases();
    fetchMetadata();
  }, []);

  const fetchPhrases = async () => {
    try {
      const response = await fetch('/api/phrases');
      const data = await response.json();
      setPhrases(data);

      // Set the first available tag as selected for each phrase key
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

  const fetchMetadata = async () => {
    try {
      const response = await fetch('/api/phrases-metadata');
      const data = await response.json();
      setCategories(data.categories);
      setSubcategories(data.subcategories);
      setTags(data.tags);
      setPhraseKeys(data.phraseKeys);
    } catch (error) {
      console.error('Ошибка получения метаданных:', error);
    }
  };

  const addPhrase = async () => {
    try {
      setError('');

      const categoryValue = newCategory === 'new' ? customCategory : newCategory;
      const subcategoryValue = newSubcategory === 'new' ? customSubcategory : newSubcategory;
      const phraseKeyValue = newPhraseKey === 'new' ? customPhraseKey : newPhraseKey;
      const tagValue = newPhraseTag === 'new' ? customTag : newPhraseTag;

      // Check if required fields are filled
      if (!categoryValue || !subcategoryValue || !phraseKeyValue || !newPhraseValue) {
        setError('Заполни все обязательные поля перед добавлением');
        return;
      }

      const session = await supabase.auth.getSession();
      const userEmail = session.data.session.user.email;

      const currentTime = new Date().toISOString();

      const response = await fetch('/api/phrases', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
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
      resetForm();
      await fetchPhrases();
      await fetchMetadata();
    } catch (error) {
      console.error('Ошибка добавления РМа:', error);
      setError('Произошла ошибка при добавлении РМа. Пожалуйста, попробуйте еще раз.');
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
  };

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
            id: id,
            category: category,
            subcategory: subcategory,
            phrase_key: phrase_key,
            phrase_value: phrase_value,
            tag: tag
          })
        })
        await fetchPhrases();
      } catch (error) {
        console.error('Ошибка удаления РМа:', error);
      }
    }
  };

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
    acc[category][subcategory][phrase_key].push(rest);
    return acc;
  }, {});

  return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-white">Добавить новый РМ</h2>
          {error && (
              <div className="bg-red-500 text-white p-3 rounded-md mb-4">
                {error}
              </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-300">
                Категория: <span className="text-red-500">*</span>
              </label>
              <select
                  id="category"
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
            <div>
              <label htmlFor="subcategory" className="block mb-2 text-sm font-medium text-gray-300">
                Подкатегория: <span className="text-red-500">*</span>
              </label>
              <select
                  id="subcategory"
                  className="w-full p-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500"
                  value={newSubcategory}
                  onChange={(e) => setNewSubcategory(e.target.value)}
                  required
              >
                <option value="">Выберите подкатегорию</option>
                {subcategories.map((subcat) => (
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
          </div>
          <div className="mt-4">
            <label htmlFor="phraseKey" className="block mb-2 text-sm font-medium text-gray-300">
              Название: <span className="text-red-500">*</span>
            </label>
            <select
                id="phraseKey"
                className="w-full p-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500"
                value={newPhraseKey}
                onChange={(e) => setNewPhraseKey(e.target.value)}
                required
            >
              <option value="">Выберите название</option>
              {phraseKeys.map((key) => (
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
          <div className="mt-4">
            <label htmlFor="phraseValue" className="block mb-2 text-sm font-medium text-gray-300">
              Текст: <span className="text-red-500">*</span>
            </label>
            <textarea
                id="phraseValue"
                className="w-full p-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500"
                rows={4}
                value={newPhraseValue}
                onChange={(e) => setNewPhraseValue(e.target.value)}
                required
            ></textarea>
          </div>
          <div className="mt-4">
            <label htmlFor="phraseTag" className="block mb-2 text-sm font-medium text-gray-300">
              Тег:
            </label>
            <select
                id="phraseTag"
                className="w-full p-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500"
                value={newPhraseTag}
                onChange={(e) => setNewPhraseTag(e.target.value)}
            >
              <option value="">Выберите тег</option>
              {tags.map((tag) => (
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
          <button
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition duration-300 ease-in-out"
              onClick={addPhrase}
          >
            Добавить РМ
          </button>
        </div>
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
                                                            Последнее
                                                            редактирование: {new Date(phrase.last_edit_time).toLocaleString()}
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
                                                              onClick={() => deletePhrase(phrase.id, phrase.phrase_category, phrase.phrase_subcategory, phrase.phrase_key, phrase.phrase_value, phrase.tag)}
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