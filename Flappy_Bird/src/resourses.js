const RESOURCE_TYPE = {
	IMAGE: 'image',
}


class ResourcesLoader {
	_typeLoadersMap = {
		[RESOURCE_TYPE.IMAGE]: async ({ src, width, height }) => {
			return new Promise((resolve, reject) => {
				const_image = new Image(width, height)
				image.addEventListener('load', () => resolve(image))
				image.addEventListener('error', (error) => reject(error))
				image.src = src
			})
		}
	}

	async load(resource) {
		const loader = this._typeLoadersMap[resource.type]
		return await loader(resource)
	}
}
