const Contenedor = require('./contenedor')

const productos = new Contenedor('productos')

console.log('------------- EJEMPLO DE EJECUCION CON USO DE setTimeout\n')

console.log('\n------------- PASO 1: SE AGREGA EL PRIMER PRODUCTO: Remera\n')

productos.save({
	title: 'Remera Lacoste',
	price: 6000,
	thumbnail: 'https://m.media-amazon.com/images/I/715ZvawCgEL._AC_UY741_.jpg'
})
	.then(id => console.log(`Objeto guardado con ID: ${id}`))
	.catch(error => console.log(error.message))

setTimeout(() => {
	console.log('\n------------- PASO 2: SE AGREGA EL SEGUNDO PRODUCTO: Gorra\n')
	productos.save({
		title: 'Gorra adidas',
		price: 3200,
		thumbnail: 'https://m.media-amazon.com/images/I/71P+9OHuqjS._AC_UX569_.jpg'
	}).then(id => console.log(`Objeto guardado con ID: ${id}`))
		.catch(error => console.log(error.message))
}, 1000)

setTimeout(() => {
	console.log('\n------------- PASO 3: SE LISTA TODOS LOS PRODUCTOS\n')
	productos.getAll()
		.then(data => console.log(data))
		.catch(error => console.log(error.message))
}, 2000)


setTimeout(() => {
	console.log('\n------------- PASO 4: SE ELIMINAN TODOS LOS PRODUCTOS \n')
	productos.deleteAll()
		.catch(error => console.log(error.message))
}, 3000)

setTimeout(() => {
	console.log('\n------------- PASO 5: SE AGREGA NUEVAMENTE EL PRIMER PRODUCTO: Pantalon lacoste \n')
	productos.save({
		title: 'Pantalon lacoste',
		price: 6000,
		thumbnail: 'https://m.media-amazon.com/images/I/71hBhl7j1kL._AC_UY550_.jpg'
	}).then(id => console.log(`Objeto guardado con ID: ${id}`))
		.catch(error => console.log(error.message))
}, 4000)

