//修改
export function update() {
	// let request3 = db.transaction(['userInfo'], 'readwrite').objectStore('userInfo').put({
	// 	name: "login",
	// 	data: {
	// 		name: "张三",
	// 		age: 99
	// 	}
	// })
	// request3.onsuccess = event => {
	// 	console.log('数据更新成功', event)
	// }

	// request3.onerror = event => {
	// 	console.log('数据更新失败', event)
	// }
}


/**
 * 查询某个仓库所有内容
 * @param {Object} db 数据库
 * @param {Object} tableName 仓库名
 */
export function getList(db, tableName) {
	var transaction = db.transaction([tableName]);
	let objectStore = transaction.objectStore(tableName);
	let list = [];
	// 遍历数据库
	objectStore.openCursor().onsuccess = event => {
		let cursor = event.target.result;
		if (cursor) {
			list.push(cursor.value)
			cursor.continue();
		}
	}
	return list
}
/**
 * 根据 key 查找数据，查询不到返回 undefined
 * @param {Object} db 数据库
 * @param {Object} storename 仓库名
 * @param {Object} key 主键
 */
export function getDataByKey(db,storename, key) {
	return new Promise((result,reject)=>{
		let store = db.transaction(storename, 'readwrite').objectStore(storename);
		let request = store.get(key);
		request.onerror = function(e) {
			reject(e)
		};
		request.onsuccess = function(e) {
			result(e.target.result)
		};
	})
}
/**
 * @param {Object} db 数据库
 * @param {Object} storename 仓库名
 * @param {Object} data 数据
 */
export function add(db, storename,data) {
	return new Promise((result,reject)=>{
		var request2 = db.transaction([storename], 'readwrite')
			.objectStore(storename)
			.add(data);
		request2.onsuccess = function(event) {
			result(event)
		};
		request2.onerror = function(event) {
			reject(event)
		}
	})
	
}

//关闭数据库
export function closeDB() {
	// INDEXEDDB_DB_RET.close();
	// console.log('数据库已关闭')
}
