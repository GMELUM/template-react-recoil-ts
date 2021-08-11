# template-react-recoil-ts
Просто шаблон... просто навигация.
Пока что не реализована поддержка свайпов назад на IOS. 
## Установка

Клонируем репозиторий:
```
git clone https://github.com/GMELUM/template-react-recoil-ts
```
Переходим в каталог:
```
cd template-react-recoil-ts
```
Устанавливаем зависимости:
NPM: `` npm i ``
YARN: `` yarn ``
## Инициальзируем:
В данном шаблоне реализована многослойная навигация. Это значит что у каждой вкладки Epic своя собственная история. и при переходе между вкладками мы сохраняем последнее состояние вкладки.
```js
import { useRoute } from  'engine';
***
const history = useRoute();
```
в файле src/engine/state.tsx нужно настроить эти слои:
```js
// Это дефолтные параметры для всех слоев при первом открытии вкладки Epic.
// Можно указать отдельные дефолтные состояния для каждого слоя.
export  const  defaultActive: TAppSector = {
	activePanel:  "main",
	activePage:  undefined,
	activeModal:  undefined,
	activePopout:  undefined,
	ignoreBack:  false,
}

// Каждый .set() это слой. 
// Сколько у вас корневых View столько нужно .set() с разными первыми аргументами.
// Вместо Epic может использоваться Root. Если у вас всего один View и вы переключаете только Panel
// то создайте просто один слой.
const  mapHistory = new  Map<string, TAppSector[]>()
	.set("feed", [defaultActive])
	.set("services", [defaultActive])
	.set("messages", [defaultActive])
	.set("clips", [defaultActive])
	.set("profile", [defaultActive]);
```
## Функционал:

### nextPage
В `nextPage` реализована система приоритетов. 
Самый высокий приоритет имеет `activeView` а самый нисший `activePopout`.
Это означает что при установке одного из параметров все нижестоящие параметры обнуляются а вышестоящие переносятся из предыдущего снимка истории.

Так же присутствует параметр `ignoreBack`  который не обязателен для установки `default = false`.
Он реализует блокировку следующего снимка истории до того момента пока пользователь не выполнит нужные вам действия. К примеру не нажмет на кнопку. Подробнее о сбросе блокировки в `backPage`.
```js
history.nextPage({}, true | false);

type TNextPage = (options: {
	activeView?: string;
	activePanel?: string;
	activePage?: string | number;
	activeModal?: string;
	activePopout?: string;
}, ignoreBack: boolean ) => void;
```

### backPage
В backPage все еще проще, он принимает 2 необязательных параметра.

**forceBack** : принимает true или false. Отвечает за сброс блокировки снимка.
**closeLowLevel** : принимает true или false. Позволяет сбросить все последние снимки где присудствуют activePopout и activeModal. Нужно для закрытия всех модальных окон и popout.

```js
history.backPage(true | fasle, true | fasle);

type TBackPage = (forceBack: boolean = false, closeLowLevel: boolean = false) => void;
```

## Вспомогательные хуки:

### useCallbackState
Позволяет получить значение atom'a recoil без привязки его к компоненту но в виде промиса.
Возвращает 2 значения в массиве по аналогии с useState:
```js
const [value,setValue] = useCallbackState(state.TEST);

/* value это промис а не параметр. 
   Для получения значения переменной нужно вызвать ее как функцию и получить ответ
*/
   const result = await value();
/* или */
   value().then((result) => console.log(result));
```

### useCallbackValue
Позволяет получить значение atom'a recoil без привязки его к компоненту но в виде промиса.
Возвращает только промис для получения значения но возвращает функцию для ее изменения.
```js
const value = useCallbackValue(state.TEST);
// Получаем само значение так же как и в предыдущем примере:
   const result = await value();
/* или */
   value().then((result) => console.log(result));
```