This pipe orders any given array based numerically or alphabetically. Supports multi-dimensional arrays and ascending/descending sorting.

### Order By Pipe
`orderBy` - `{{someArray | orderBy : sortingType : max : nameOfColumn}}`

### Order By Parameters
  * `sortingType` _- string - (Default: `asc`)(Optional)_ -
    The direction the array will be sorted. `asc` or `desc`
  * `nameOfColumn` _- string or Array<string> - (Default: `null`)(Optional)_ -
    Ending number of array

### Order By Example
```javascript
numberArray: Array<number> = [23,76,123,1,53];
fruitArray: Array<string> = ['orange', 'banana', 'apple', 'pineapple'];
todos: Array<Todo> = [
    new Todo('complete','Eat'),
    new Todo('incomplete', 'Sleep'),
    new Todo('complete', 'Code')
];

class Todo{
	name: string;
	status: string;

	constructor(name: string, status: string){
		this.name = name;
		this.status = status;
	}
}
```

```html
Basic Array of single type
<span *ng-for="#n of numberArray | orderBy">{{n}}<span>
<span *ng-for="#fruit of fruitArray | orderBy : 'desc'">{{fruit}}<span>

Multidimensional Array Sort on single column
<span *ng-for="#todo of todos | orderBy : 'asc' : 'status'">{{todo.name}} - {{todo.status}}<span>

Multidimensional Array Sort on multiple columns
<span *ng-for="#todo of todos | orderBy : 'asc' : ['status', 'title']">{{todo.name}} - {{todo.status}}<span>
```