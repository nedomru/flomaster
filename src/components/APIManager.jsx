import {Disclosure} from '@headlessui/react';
import {ChevronUpIcon} from '@heroicons/react/24/solid';
import {supabase} from "@/lib/supabase";

const APIManager = () => {
  const [phrases, setPhrases] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [newSubcategory, setNewSubcategory] = useState('');
  const [newPhraseKey, setNewPhraseKey] = useState('');
  const [newPhraseValue, setNewPhraseValue] = useState('');
  const [editingPhraseId, setEditingPhraseId] = useState(null);
  const [editedPhraseValue, setEditedPhraseValue] = useState('');

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
      const userEmail = session.data.session.user.email

      const currentTime = new Date().toISOString();

      const response = await fetch('/api/phrases', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          category: newCategory,
          subcategory: newSubcategory,
          phrase_key: newPhraseKey,
          phrase_value: newPhraseValue,
          created_by: userEmail,
          last_edit_time: currentTime,
        }),
      });
      await response.json();
      setNewCategory('');
      setNewSubcategory('');
      setNewPhraseKey('');
      setNewPhraseValue('');
      await fetchPhrases();
    } catch (error) {
      console.error('Ошибка добавления РМа:', error);
    }
  };

  const updatePhrase = async (id) => {
    try {
      const session = await supabase.auth.getSession();
      const userEmail = session.data.session.user.email

      const currentTime = new Date().toISOString();

      const response = await fetch('/api/phrases', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
      });
      await response.json();
      setEditingPhraseId(null);
      setEditedPhraseValue('');
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
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Добавить новый РМ</h2>
          <div className="mb-4">
            <label htmlFor="category" className="block mb-2">
              Категория:
            </label>
            <input
                type="text"
                id="category"
                className="w-full p-2 bg-gray-800 text-white rounded"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="subcategory" className="block mb-2">
              Подкатегория:
            </label>
            <input
                type="text"
                id="subcategory"
                className="w-full p-2 bg-gray-800 text-white rounded"
                value={newSubcategory}
                onChange={(e) => setNewSubcategory(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phraseKey" className="block mb-2">
              Ключ:
            </label>
            <input
                type="text"
                id="phraseKey"
                className="w-full p-2 bg-gray-800 text-white rounded"
                value={newPhraseKey}
                onChange={(e) => setNewPhraseKey(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phraseValue" className="block mb-2">
              Текст РМа:
            </label>
            <textarea
                id="phraseValue"
                className="w-full p-2 bg-gray-800 text-white rounded"
                rows={4}
                value={newPhraseValue}
                onChange={(e) => setNewPhraseValue(e.target.value)}
            ></textarea>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={addPhrase}>
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
                            } w-5 h-5 text-white`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-300">
                        {Object.entries(subcategories).map(([subcategory, phrases]) => (
                            <Disclosure key={subcategory} as="div" className="mb-2">
                              {({open}) => (
                                  <>
                                    <Disclosure.Button
                                        className="flex justify-between w-full px-4 py-2 text-base font-medium text-left text-white bg-gray-700 rounded-lg hover:bg-gray-600 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                                      <span>{subcategory}</span>
                                      <ChevronUpIcon
                                          className={`${
                                              open ? 'transform rotate-180' : ''
                                          } w-5 h-5 text-white`}
                                      />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-300">
                                      {phrases.map((phrase) => (
                                            <p className="text-gray-300 mb-2">{phrase.phrase_key}</p>
                                            {editingPhraseId === phrase.id ? (
                                                <div>
                                    <textarea
                                        className="w-full p-2 bg-gray-700 text-white rounded mb-2"
                                        value={editedPhraseValue}
                                        onChange={(e) => setEditedPhraseValue(e.target.value)}
                                    ></textarea>
                                                  <button
                                                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2"
                                                      onClick={() => updatePhrase(phrase.id)}
                                                  >
                                                    Сохранить
                                                  </button>
                                                  <button
                                                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                                                      onClick={() => setEditingPhraseId(null)}
                                                  >
                                                    Отмена
                                                  </button>
                                                </div>
                                            ) : (
                                                <div>
                                                  <p className="text-white mb-2">{phrase.phrase_value}</p>
                                                  <button
                                                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
                                                      onClick={() => {
                                                        setEditingPhraseId(phrase.id);
                                                        setEditedPhraseValue(phrase.phrase_value);
                                                      }}
                                                  >
                                                    Редактировать
                                                  </button>
                                                  <button
                                                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                                      onClick={() => deletePhrase(phrase.id)}
                                                  >
                                                    Удалить
                                                  </button>
                                                </div>
                                            )}
                                          </div>
                                      ))}
                                    </Disclosure.Panel>
                                  </>
                              )}
                            </Disclosure>
                        ))}
                      </Disclosure.Panel>
                    </>
                )}
              </Disclosure>
          ))}
        </div>
      </div>
  );
};

export default APIManager;