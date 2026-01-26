## 全局公共参数
#### 全局Header参数
参数名 | 示例值 | 参数描述
--- | --- | ---
暂无参数
#### 全局Query参数
参数名 | 示例值 | 参数描述
--- | --- | ---
暂无参数
#### 全局Body参数
参数名 | 示例值 | 参数描述
--- | --- | ---
暂无参数
#### 全局认证方式
```text
noauth
```
#### 全局预执行脚本
```javascript
暂无预执行脚本
```
#### 全局后执行脚本
```javascript
暂无后执行脚本
```
## /IOT_Xthings
```text
暂无描述
```
#### Header参数
参数名 | 示例值 | 参数描述
--- | --- | ---
暂无参数
#### Query参数
参数名 | 示例值 | 参数描述
--- | --- | ---
暂无参数
#### Body参数
参数名 | 示例值 | 参数描述
--- | --- | ---
暂无参数
#### 认证方式
```text
noauth
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /IOT_Xthings/进出记录分页查询
```text
暂无描述
```
#### 接口状态
> 开发中

#### 接口URL
> http://localhost:6160/api/base-record/page

#### 请求方式
> POST

#### Content-Type
> json

#### 请求Body参数
```javascript
{
    "sn":"设备名称",
    "name":"姓名",
    "pageNum":"页码",
    "pageSize":"每页大小"
}
```
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
sn | 设备名称 | String | 是 | -
name | 姓名 | String | 是 | -
pageNum | 页码 | String | 是 | -
pageSize | 每页大小 | String | 是 | -
#### 认证方式
```text
noauth
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
#### 成功响应示例
```javascript
{
	"code": 0,
	"msg": null,
	"data": {
		"records": [
			{
				"id": 598,
				"cmd": "F1upRecord",
				"devName": "3017-门神域OUT",
				"sn": "c5ce000020225c28",
				"jobnumber": "50021",
				"name": "黄强元",
				"time": 1769228882,
				"type": 1,
				"createTime": null,
				"personType": null,
				"typeDesc": null,
				"personTypeDesc": null,
				"timeStr": null
			},
			{
				"id": 597,
				"cmd": "F1upRecord",
				"devName": "3017-门神域OUT",
				"sn": "c5ce000020225c28",
				"jobnumber": "50010",
				"name": "张富杰",
				"time": 1769228744,
				"type": 1,
				"createTime": null,
				"personType": null,
				"typeDesc": null,
				"personTypeDesc": null,
				"timeStr": null
			},
			{
				"id": 596,
				"cmd": "F1upRecord",
				"devName": "3017-门神域IN",
				"sn": "c5ce0000203aa438",
				"jobnumber": "50007",
				"name": "廖博文",
				"time": 1769228589,
				"type": 1,
				"createTime": null,
				"personType": null,
				"typeDesc": null,
				"personTypeDesc": null,
				"timeStr": null
			},
			{
				"id": 595,
				"cmd": "F1upRecord",
				"devName": "3017-门神域IN",
				"sn": "c5ce0000203aa438",
				"jobnumber": "50013",
				"name": "马振钦",
				"time": 1769228513,
				"type": 1,
				"createTime": null,
				"personType": null,
				"typeDesc": null,
				"personTypeDesc": null,
				"timeStr": null
			},
			{
				"id": 594,
				"cmd": "F1upRecord",
				"devName": "3017-门神域IN",
				"sn": "c5ce0000203aa438",
				"jobnumber": "50019",
				"name": "蒋林峰",
				"time": 1769228480,
				"type": 1,
				"createTime": null,
				"personType": null,
				"typeDesc": null,
				"personTypeDesc": null,
				"timeStr": null
			},
			{
				"id": 593,
				"cmd": "F1upRecord",
				"devName": "3017-门神域IN",
				"sn": "c5ce0000203aa438",
				"jobnumber": "50010",
				"name": "张富杰",
				"time": 1769228450,
				"type": 1,
				"createTime": null,
				"personType": null,
				"typeDesc": null,
				"personTypeDesc": null,
				"timeStr": null
			},
			{
				"id": 592,
				"cmd": "F1upRecord",
				"devName": "3017-门神域IN",
				"sn": "c5ce0000203aa438",
				"jobnumber": "50018",
				"name": "雷宏志",
				"time": 1769228422,
				"type": 1,
				"createTime": null,
				"personType": null,
				"typeDesc": null,
				"personTypeDesc": null,
				"timeStr": null
			},
			{
				"id": 591,
				"cmd": "F1upRecord",
				"devName": "3017-门神域OUT",
				"sn": "c5ce000020225c28",
				"jobnumber": "50018",
				"name": "雷宏志",
				"time": 1769228331,
				"type": 1,
				"createTime": null,
				"personType": null,
				"typeDesc": null,
				"personTypeDesc": null,
				"timeStr": null
			},
			{
				"id": 590,
				"cmd": "F1upRecord",
				"devName": "3017-门神域OUT",
				"sn": "c5ce000020225c28",
				"jobnumber": "50025",
				"name": "张飞",
				"time": 1769228286,
				"type": 1,
				"createTime": null,
				"personType": null,
				"typeDesc": null,
				"personTypeDesc": null,
				"timeStr": null
			},
			{
				"id": 589,
				"cmd": "F1upRecord",
				"devName": "3017-门神域OUT",
				"sn": "c5ce000020225c28",
				"jobnumber": "50024",
				"name": "谢明均",
				"time": 1769228266,
				"type": 1,
				"createTime": null,
				"personType": null,
				"typeDesc": null,
				"personTypeDesc": null,
				"timeStr": null
			}
		],
		"total": 392,
		"size": 10,
		"current": 1,
		"orders": [],
		"optimizeCountSql": true,
		"searchCount": true,
		"countId": null,
		"maxLimit": null,
		"pages": 40
	}
}
```
## /IOT_Xthings/进出记录详细查询
```text
暂无描述
```
#### 接口状态
> 开发中

#### 接口URL
> http://localhost:6160/api/base-record/598

#### 请求方式
> GET

#### Content-Type
> json

#### 请求Body参数
```javascript

```
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
sn | 设备名称 | String | 是 | -
name | 姓名 | String | 是 | -
pageNum | 页码 | String | 是 | -
pageSize | 每页大小 | String | 是 | -
#### 认证方式
```text
noauth
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
#### 成功响应示例
```javascript
{
	"code": 0,
	"msg": null,
	"data": {
		"id": 598,
		"cmd": "F1upRecord",
		"devName": "3017-门神域OUT",
		"sn": "c5ce000020225c28",
		"image": null,
		"jobnumber": "50021",
		"name": "黄强元",
		"time": 1769228882,
		"type": 1,
		"createTime": 1769228891000,
		"updateTime": 1769228891000,
		"personType": null
	}
}
```
## /IOT_Xthings/人员分页查询
```text
暂无描述
```
#### 接口状态
> 开发中

#### 接口URL
> http://localhost:6160/personne/page

#### 请求方式
> POST

#### Content-Type
> json

#### 请求Body参数
```javascript
{
    "name":"张三",
    "pageNum":"1",
    "pageSize":"2"
}
```
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
name | 张三 | String | 是 | -
pageNum | 1 | String | 是 | -
pageSize | 2 | String | 是 | -
#### 认证方式
```text
noauth
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
#### 成功响应示例
```javascript
{
	"code": 0,
	"msg": null,
	"data": {
		"records": [
			{
				"id": 1,
				"createTime": null,
				"updateTime": null,
				"creatorId": null,
				"updaterId": null,
				"creatorName": null,
				"updaterName": null,
				"delFlag": "0",
				"outId": null,
				"outType": null,
				"outName": null,
				"status": null,
				"acquirerId": null,
				"acquirerName": null,
				"tenantId": null,
				"name": "张三",
				"number": null,
				"snNumber": null,
				"nameType": null,
				"image": null
			}
		],
		"total": 1,
		"size": 2,
		"current": 1,
		"orders": [],
		"optimizeCountSql": true,
		"searchCount": true,
		"countId": null,
		"maxLimit": null,
		"pages": 1
	}
}
```
## /IOT_Xthings/人员修改
```text
暂无描述
```
#### 接口状态
> 开发中

#### 接口URL
> http://localhost:6160/personne/update

#### 请求方式
> PUT

#### Content-Type
> json

#### 请求Body参数
```javascript
{
    	"id": 1,
				"createTime": null,
				"updateTime": null,
				"creatorId": null,
				"updaterId": null,
				"creatorName": null,
				"updaterName": null,
				"delFlag": "0",
				"outId": null,
				"outType": null,
				"outName": null,
				"status": null,
				"acquirerId": null,
				"acquirerName": null,
				"tenantId": null,
				"name": "张三",
				"number": null,
				"snNumber": "12233",
				"nameType": null,
				"image": null
}
```
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
name | 张三 | String | 是 | -
pageNum | 1 | String | 是 | -
pageSize | 2 | String | 是 | -
#### 认证方式
```text
noauth
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
#### 成功响应示例
```javascript
{
	"code": 0,
	"msg": null,
	"data": {
		"records": [
			{
				"id": 1,
				"createTime": null,
				"updateTime": null,
				"creatorId": null,
				"updaterId": null,
				"creatorName": null,
				"updaterName": null,
				"delFlag": "0",
				"outId": null,
				"outType": null,
				"outName": null,
				"status": null,
				"acquirerId": null,
				"acquirerName": null,
				"tenantId": null,
				"name": "张三",
				"number": null,
				"snNumber": null,
				"nameType": null,
				"image": null
			}
		],
		"total": 1,
		"size": 2,
		"current": 1,
		"orders": [],
		"optimizeCountSql": true,
		"searchCount": true,
		"countId": null,
		"maxLimit": null,
		"pages": 1
	}
}
```
## /IOT_Xthings/人员修改 副本
```text
暂无描述
```
#### 接口状态
> 开发中

#### 接口URL
> http://localhost:6160/personne/add

#### 请求方式
> POST

#### Content-Type
> json

#### 请求Body参数
```javascript
{
				"createTime": null,
				"updateTime": null,
				"creatorId": null,
				"updaterId": null,
				"creatorName": null,
				"updaterName": null,
				"delFlag": "0",
				"outId": null,
				"outType": null,
				"outName": null,
				"status": null,
				"acquirerId": null,
				"acquirerName": null,
				"tenantId": null,
				"name": "张三si",
				"number": null,
				"snNumber": "12233",
				"nameType": null,
				"image": null
}
```
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
name | 张三 | String | 是 | -
pageNum | 1 | String | 是 | -
pageSize | 2 | String | 是 | -
#### 认证方式
```text
noauth
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
#### 成功响应示例
```javascript
{
	"code": 0,
	"msg": null,
	"data": {
		"records": [
			{
				"id": 1,
				"createTime": null,
				"updateTime": null,
				"creatorId": null,
				"updaterId": null,
				"creatorName": null,
				"updaterName": null,
				"delFlag": "0",
				"outId": null,
				"outType": null,
				"outName": null,
				"status": null,
				"acquirerId": null,
				"acquirerName": null,
				"tenantId": null,
				"name": "张三",
				"number": null,
				"snNumber": null,
				"nameType": null,
				"image": null
			}
		],
		"total": 1,
		"size": 2,
		"current": 1,
		"orders": [],
		"optimizeCountSql": true,
		"searchCount": true,
		"countId": null,
		"maxLimit": null,
		"pages": 1
	}
}
```
