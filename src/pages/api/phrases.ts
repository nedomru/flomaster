import type {APIRoute} from "astro";

interface StructuredData {
    [category: string]: {
        [subcategory: string]: {
            [modelName: string]: string;
        };
    };
}


const phrases: StructuredData  = {
    "Продажи": {
        "Декодеры": {
            "Movix Model 2023": `Модель: Movix Model 2023
- Официальный Android TV 11
- Голосовой поиск (Google Assistant)
- Подключение устройств по Bluetooth
- Объемный звук Dolby Atmos
- Поддержка Dolby Vision
- Увеличенный объем памяти – 4 Гб RAM и 16 Гб Flash
- Подключение по Wi-Fi и кабелем
- Поддержка 4К
- Родительский контроль
- Управление просмотром
- Списки каналов
- Гарантия: 1 год

Стоимость
- В собственность - 6 200 ₽
- В рассрочку:
- 1 400 ₽/мес. на 6 месяцев (общая стоимость - 8 400 ₽)`,
            "Movix Model 2021": `Модель: Movix Model 2021
- Официальный Android TV 11
- Голосовой поиск (Google Assistant)
- Подключение устройств по Bluetooth
- Просмотр файлов с USB-флешки
- Поддержка 4К
- Подключение по Wi-Fi и кабелем
- Bluetooth 5.1
- Родительский контроль
- Управление просмотром
- Списки каналов
- Гарантия: 1 год

Стоимость:
- В собственность - 5 100 ₽
- В рассрочку:
- 980 ₽/мес. на 6 месяцев (общая стоимость - 5 880 ₽)`,
            "Movix Go": `Модель: Movix Go
- Официальный Android TV 11
- Голосовой поиск (Google Assistant)
- Подключение устройств по Bluetooth
- Поддержка 4К
- Подключение по Wi-Fi
- Bluetooth 5.1
- Родительский контроль
- Управление просмотром
- Списки каналов
- Гарантия: 1 год

Стоимость:
- В собственность - 5 590 ₽
- В рассрочку:
- 1080 ₽/мес. на 6 месяцев (общая стоимость - 6 480 ₽)`
        },
        "Роутеры": {
            "TP-Link Archer EC220": `Модель: TP-Link Archer EC220
- Скорость по кабелю: до 1000 Мбит/с
- Скорость по Wi-Fi: до 300 Мбит/с на 2,4 ГГц, до 867 Мбит/с на 5 ГГц
- Площадь покрытия: до 70 м2
- Одновременно устройств в сети: до 10
- Технологии: EasyMesh, MU-MIMO, Beamforming
- Гарантия: 3 года
- Отверстия для настенного крепления
- Подходит для любого провайдера

Стоимость:
- В собственность - 4 490 ₽
- В рассрочку:
- 825 ₽/мес. на 6 месяцев (общая стоимость - 4 950 ₽)`,
            "TP-Link Archer EX220": `Модель: TP-Link Archer EX220
- Скорость по кабелю: до 1000 Мбит/с
- Скорость по Wi-Fi: до 574 Мбит/с на 2,4 ГГц, до 1201 Мбит/с на 5 ГГц
- Площадь покрытия: до 80 м2
- Одновременно устройств в сети: до 20
- Технологии: Мульти-SSID, EasyMesh, DL/UL OFDMA, MU-MIMO, Beamforming, Airtime Fairness
- Гарантия: 4 года
- Отверстия для настенного крепления
- Подходит для любого провайдера

Стоимость:
- В собственность - 6 800 ₽
- В рассрочку:
- 1 270 ₽/мес. на 6 месяцев (общая стоимость - 7 620 ₽)`,
            "TP-Link Archer EX511": `Модель: TP-Link Archer EX511
- Скорость по кабелю: до 1000 Мбит/с
- Скорость по Wi-Fi: до 574 Мбит/с на 2,4 ГГц, до 1201 Мбит/с на 5 ГГц
- Площадь покрытия: до 80 м2
- Одновременно устройств в сети: до 50
- Технологии: Мульти-SSID, EasyMesh, OFDMA, MU-MIMO, Beamforming, Airtime Fairness и родительский контроль
- Гарантия: 4 года
- Отверстия для настенного крепления
- Подходит для любого провайдера

Стоимость:
- В собственность - 8 900 ₽
- В рассрочку:
- 1 650 ₽/мес. на 6 месяцев (общая стоимость - 9 900 ₽)`,
            "TP-Link Archer AX55": `Модель: TP-Link Archer AX55
- Скорость по кабелю: до 1000 Мбит/с
- Скорость по Wi-Fi: до 574 Мбит/с на 2,4 ГГц, до 2402 Мбит/с на 5 ГГц
- Площадь покрытия: до 80 м2
- Одновременно устройств в сети: до 50
- Технологии: OneMesh, TP-Link HomeShield - защита от кибератак
- Гарантия: 4 года
- Отверстия для настенного крепления
- Подходит для любого провайдера

Стоимость:
- В собственность - 8 900 ₽
- В рассрочку:
- 1 650 ₽/мес. на 6 месяцев (общая стоимость - 9 900 ₽)`,
            "TP-Link Archer AX73": `Модель: TP-Link Archer AX73
- Скорость по кабелю: до 1000 Мбит/с
- Скорость по Wi-Fi: до 574 Мбит/с на 2,4 ГГц, до 4804 Мбит/с на 5 ГГц
- Площадь покрытия: до 120 м2
- Одновременно устройств в сети: до 200
- Технологии: OneMesh, TP-Link Homeshield, OFDMA, MU-MIMO, Beam Steering, Beamforming, корпус с улучшенной вентиляцией
- Гарантия: 4 года
- Отверстия для настенного крепления
- Подходит для любого провайдера

Стоимость:
- В собственность - 12999 ₽
- В рассрочку:
- 1 210 ₽/мес. на 12 месяцев (общая стоимость - 14 520 ₽)
- 680 ₽/мес. на 24 месяца (общая стоимость - 16 320 ₽)`,
            "D-Link DIR842/R7": `Модель: D-Link DIR-842/R7
- Скорость по кабелю: до 1000 Мбит/с
- Скорость по Wi-Fi: до 300 Мбит/с на 2,4 ГГц, до 867 Мбит/с на 5 ГГц
- Площадь покрытия: до 70 м2
- Одновременно устройств в сети: до 10
- Технологии: EasyMesh, Beamforming, Band Steering
- Гарантия: 1 год
- Отверстия для настенного крепления
- Подходит для любого провайдера

Стоимость:
- В собственность - 4 490 ₽
- В рассрочку:
- 825 ₽/мес. на 6 месяцев (общая стоимость - 4 950 ₽)`,
            "D-Link DIR-X1530": `Модель: D-Link DIR-X1530
- Скорость по кабелю: до 1000 Мбит/с
- Скорость по Wi-Fi: до 300 Мбит/с на 2,4 ГГц, до 1201 Мбит/с на 5 ГГц
- Площадь покрытия: до 80 м2
- Одновременно устройств в сети: до 20
- Технологии: EasyMesh, Beamforming, OFDMA, TWT
- Гарантия: 1 год
- Отверстия для настенного крепления
- Подходит для любого провайдера

Стоимость:
- В собственность - 5 990 ₽
- В рассрочку:
- 1 115 ₽/мес. на 6 месяцев (общая стоимость - 6 690 ₽)`,
            "ASUS ROG Rapture GT-AX6000": `Модель: ROG Rapture GT-AX6000
- Скорость по кабелю: до 2500 Мбит/с
- Скорость по Wi-Fi: до 1148 Мбит/с на 2,4 ГГц, до 4804 Мбит/с на 5 ГГц
- Площадь покрытия: до 100 м2
- Технологии: AiMesh, ROG First, OpenNAT
- Гарантия: 3 года
- Подходит для любого провайдера

Стоимость:
- В собственность - 28000 ₽`,
            "Dom.ru Wave": `Модель: Wave
- Скорость по кабелю: до 1000 Мбит/с
- Скорость по Wi-Fi: до 500 Мбит/с
- Площадь покрытия: до 80 м2
- Технологии: EasyMesh
- Одновременно устройств в сети: до 50
- Гарантия: 1 год
- Подходит для любого провайдера

Стоимость:
- В собственность - 4 990 ₽
- В рассрочку:
- 930 ₽/мес. на 6 месяцев (общая стоимость - 5 580 ₽)`
        }
    }
}

export const GET: APIRoute = ({ request }) => {
    const url = new URL(request.url);
    const categoryName = url.searchParams.get("category");
    const subCategoryName = url.searchParams.get("subcategory");
    const modelName = url.searchParams.get("model");
    const query = url.searchParams.get("query") || "";

    let result: StructuredData = {};

    const filterAndAddToResult = (data: StructuredData, category: string, subcategory: string, model: string) => {
        if (!result[category]) result[category] = {};
        if (!result[category][subcategory]) result[category][subcategory] = {};

        if (model.toLowerCase().includes(query.toLowerCase()) || data[category][subcategory][model].toLowerCase().includes(query.toLowerCase())) {
            result[category][subcategory][model] = data[category][subcategory][model];
        }
    };

    if (categoryName && phrases[categoryName]) {
        if (subCategoryName && phrases[categoryName][subCategoryName]) {
            if (modelName && phrases[categoryName][subCategoryName][modelName]) {
                filterAndAddToResult(phrases, categoryName, subCategoryName, modelName);
            } else {
                Object.keys(phrases[categoryName][subCategoryName]).forEach(model => {
                    filterAndAddToResult(phrases, categoryName, subCategoryName, model);
                });
            }
        } else {
            Object.keys(phrases[categoryName]).forEach(subcategory => {
                Object.keys(phrases[categoryName][subcategory]).forEach(model => {
                    filterAndAddToResult(phrases, categoryName, subcategory, model);
                });
            });
        }
    } else {
        Object.keys(phrases).forEach(category => {
            Object.keys(phrases[category]).forEach(subcategory => {
                Object.keys(phrases[category][subcategory]).forEach(model => {
                    filterAndAddToResult(phrases, category, subcategory, model);
                });
            });
        });
    }

    return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' }
    });
};

