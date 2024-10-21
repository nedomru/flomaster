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

  useEffect(() => {
    fetchPhrases();
  }, []);

  const fetchPhrases = async () => {
    try {
      const response = await fetch('/api/phrases');
      const data = await response.json();
      setPhrases(data);
    } catch (error) {
      console.error('Ошибка получения РМов:', error);
    }
  };

  const addPhrase = async () => {
    try {
      const session = await supabase.auth.getSession();
      const userEmail = session.data.session.user.email;

      const currentTime = new Date().toISOString();

      const response = await fetch('/api/phrases', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          category: newCategory,
          subcategory: newSubcategory,
          phrase_key: newPhraseKey,
          phrase_value: newPhraseValue,
          tag: newPhraseTag,
          created_by: userEmail,
          last_edit_time: currentTime,
        }),
      });
      await response.json();
      setNewCategory('');
      setNewSubcategory('');
      setNewPhraseKey('');
      setNewPhraseValue('');
      setNewPhraseTag('');
      await fetchPhrases();
    } catch (error) {
      console.error('Ошибка добавления РМа:', error);
    }
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

  const deletePhrase = async (id) => {
    if (window.confirm('Ты уверен, что хочешь удалить РМ?')) {
      try {
        await fetch('/api/phrases', {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({id}),
        });
        fetchPhrases();
      } catch (error) {
        console.error('Ошибка удаления РМа:', error);
      }
    }
  };

  const groupedPhrases = phrases.reduce((acc, phrase) => {
    const {category, subcategory, ...rest} = phrase;
    if (!acc[category]) {
      acc[category] = {};
    }
    if (!acc[category][subcategory]) {
      acc[category][subcategory] = [];
    }
    acc[category][subcategory].push(rest);
    return acc;
  }, {});

  return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-white">Добавить новый РМ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-300">
                Категория:
              </label>
              <input
                  type="text"
                  id="category"
                  className="w-full p-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="subcategory" className="block mb-2 text-sm font-medium text-gray-300">
                Подкатегория:
              </label>
              <input
                  type="text"
                  id="subcategory"
                  className="w-full p-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500"
                  value={newSubcategory}
                  onChange={(e) => setNewSubcategory(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="phraseKey" className="block mb-2 text-sm font-medium text-gray-300">
              Название:
            </label>
            <input
                type="text"
                id="phraseKey"
                className="w-full p-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500"
                value={newPhraseKey}
                onChange={(e) => setNewPhraseKey(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="phraseValue" className="block mb-2 text-sm font-medium text-gray-300">
              Текст:
            </label>
            <textarea
                id="phraseValue"
                className="w-full p-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500"
                rows={4}
                value={newPhraseValue}
                onChange={(e) => setNewPhraseValue(e.target.value)}
            ></textarea>
          </div>
          <div className="mt-4">
            <label htmlFor="phraseTag" className="block mb-2 text-sm font-medium text-gray-300">
              Тег (необязательно):
            </label>
            <input
                type="text"
                id="phraseTag"
                className="w-full p-2 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500"
                value={newPhraseTag}
                onChange={(e) => setNewPhraseTag(e.target.value)}
            />
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
                          className="flex justify-between w-full px-4 py-2 text-lg font-medium text-left text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75"
                      >
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
                          {Object.entries(subcategories).map(([subcategory, phrases]) => (
                              <Disclosure key={subcategory} as="div" className="mb-2">
                                {({open}) => (
                                    <>
                                      <Disclosure.Button
                                          className="flex justify-between w-full px-4 py-2 text-base font-medium text-left text-white bg-gray-700 rounded-lg hover:bg-gray-600 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75"
                                      >
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
                                          {phrases.map((phrase) => (
                                              <div key={phrase.id}
                                                   className="mb-4 bg-gray-800 rounded-lg p-4 shadow-lg transition-all duration-300 hover:shadow-xl">
                                                <h3 className="text-xl font-semibold text-white mb-2">{phrase.phrase_key}</h3>
                                                {editingPhraseId === phrase.id ? (
                                                    <div>
                                        <textarea
                                            className="w-full p-2 bg-gray-700 text-white rounded mb-2"
                                            value={editedPhraseValue}
                                            onChange={(e) => setEditedPhraseValue(e.target.value)}
                                        ></textarea>
                                                      <input
                                                          type="text"
                                                          className="w-full p-2 bg-gray-700 text-white rounded mb-2"
                                                          value={editedPhraseTag}
                                                          onChange={(e) => setEditedPhraseTag(e.target.value)}
                                                          placeholder="Тег"
                                                      />
                                                      <button
                                                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2 transition-colors duration-300"
                                                          onClick={() => updatePhrase(phrase.id)}
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
                                                ) : (
                                                    <div>
                                                      <p className="text-white mb-2">{phrase.phrase_value}</p>
                                                      <p className="text-gray-400 mb-2">Тег: {phrase.tag || 'Нет тега'}</p>
                                                      <p className="text-gray-400 mb-2">Создал: {phrase.created_by}</p>
                                                      <p className="text-gray-400 mb-2">Последнее
                                                        редактирование: {new Date(phrase.last_edit_time).toLocaleString()}</p>
                                                      <button
                                                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2 transition-colors duration-300"
                                                          onClick={() => {
                                                            setEditingPhraseId(phrase.id);
                                                            setEditedPhraseValue(phrase.phrase_value);
                                                            setEditedPhraseTag(phrase.tag || '');
                                                          }}
                                                      >
                                                        Редактировать
                                                      </button>
                                                      <button
                                                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors duration-300"
                                                          onClick={() => deletePhrase(phrase.id)}
                                                      >
                                                        Удалить
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