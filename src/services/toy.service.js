
import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'toy'
const PAGE_SIZE = 4
const gLabels = ["All", "On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor"]

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getNumOfPages,
    getLabels,
}

function query(filterBy = { txt: '', pageIdx: 0, labels: [] }) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {

            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                toys = toys.filter(toy => regex.test(toy.name) || regex.test(toy.ctg))
            }
    
            if (filterBy.labels.length > 0) {
                toys = toys.filter(toy =>
                    toy.labels.filter(label => filterBy.labels.includes(label)).length > 0)
            }

            if (filterBy.inStock) {        
                toys = toys.filter(toy => {                    
                    return JSON.parse(filterBy.inStock) === toy.inStock
                })
            }
            
            if (filterBy.sortBy === 'name') {
                toys = toys.sort((a, b) => {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
                    else if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
                    return 0
                })

            } else if (filterBy.sortBy === 'price') {
                toys = toys.sort((a, b) => a[filterBy.sortBy] - b[filterBy.sortBy])
            } else if (filterBy.sortBy === 'recent') {
                toys = toys.sort((a, b) => b.createdAt - a.createdAt)
            }
            
            if (filterBy.pageIdx !== undefined) {
                const startIdx = +filterBy.pageIdx * PAGE_SIZE
                if (startIdx > toys.length - 1) return Promise.reject()
                toys = toys.slice(startIdx, startIdx + PAGE_SIZE)
            }

            return toys
        })
}

function getLabels() {
    return gLabels
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        // toy.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}

function getEmptyToy() {
    return {
        name: '',
        price: 0,
        labels: [],
        createdAt: Date.now(),
        review: 'Best ever',
        inStock: true,
        img: ''
    }
}

function getNumOfPages() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)).length / PAGE_SIZE
}

// TEST DATA
//  storageService.post(STORAGE_KEY, {name: 'Robot', price: 50.30,labels: ["On wheels", "Baby"], "createdAt": 1631031801010, "inStock": true, "review": 'Ok', img: '../assets/img/Train.jpg'}).then(x => console.log(x))

