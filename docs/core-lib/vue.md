---
sidebarDepth: 5
---
# vue 扩展
## filter 
### formatDate
> 时间戳日期格式化 
```javascript
(date:number | string, fmt:string):string
```
### formatNub
> 不四舍五入保留n位小数 
```javascript
(val:number | string, len:number = 2):number
```

### sublen
> 字符串截取
```javascript
(value:string, length:number = 8):string
```

## mixin

### page
```javascript
    data () {
      return {
        page: 1,
        pre_page: 10,
        total_count: 0
      }
    }
```

##  Vue.prototype
### $_util
#### formatDate
> 时间戳日期格式化 
```javascript
formatDate (date:number | string, fmt:string):string
```
  
* dateToStamp
 > 时间字符串转换为时间戳 (默认时间戳长度为10位)
```javascript
dateToStamp (str:string, len:number=10):number
```

* unique
 > 数组去重
```javascript
unique (arr:Array):Array
```

* getOptionArray
 > 获取对象数组某些项 (例子：([{name:1,age:2,height:3}],'name,age'):[{name,age}] )
```javascript
getOptionArray (arr:Array,keys:string):Array
```

* deepClone
> 深拷贝
```javascript
deepClone (source:Array | Object):Array | Object
```
* sublen
> 字符串截取
```javascript
sublen (value:string, length:number = 8):string
```

* uniqueObj
> 去除对象数组中某一属性重复的对象
```javascript
uniqueObj (obj:Array, target:string):Array
```

* formatNub
> 不四舍五入保留n位小数 
```javascript
formatNub(val:number | string, len:number = 2):number
```

* inArray
> 判断元素是否在数组内 (-1 不存在)
```javascript
inArray(val:any , arr:Array):number
```
### $_createFetch
> fetch工厂
```javascript
createFetch (options:object):Object
```
* setStorage
> 设置localStorage
```javascript
setStorage (key, value)
```
* getStorage
> 获取localStorage
```javascript
getStorage (key, value)
```

### $_math (精度数学处理)
```javascript
$_math.strip(num)         // strip a number to nearest right number
$_math.plus(num1, num2, num3, ...)   // addition, num + num2 + num3, two numbers is required at least.
$_math.minus(num1, num2, num3, ...)  // subtraction, num1 - num2 - num3
$_math.times(num1, num2, num3, ...)  // multiplication, num1 * num2 * num3
$_math.divide(num1, num2, num3, ...) // division, num1 / num2 / num3
$_math.round(num, ratio)  // round a number based on ratio
```

* recursion (分类层级选择器数据处理）
```
const map = { //数据映射
        value: 'id',
        label: 'name',
        children: 'children'
      }
      let list = data.data
      this.$_util.recursion(list, map)
```






