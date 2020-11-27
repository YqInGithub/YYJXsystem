module.exports = {
	css: {
		loaderOptions: {
			// 给 sass-loader 传递选项
			scss: {
				// sass-loader版本V8以上
				prependData: '@import "~@/main.scss";'
				// sass-loader版本V8以下
				// additionalData: '@import "~@/assets/common.scss";'
			}
		}
	}
}
