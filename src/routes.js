import { ToyApp } from "../src/pages/toy-app.jsx"
import { ToyEdit } from "../src/cmps/toy-edit.jsx"
import { ToyDetails } from "../src/cmps/toy-details.jsx"
import { About} from '../src/pages/about-us.jsx'
import { HomePage } from '../src/pages/home-page.jsx'

export default [{
        path: '/toy/edit/:toyId?',
        component: ToyEdit
    },
    {
        path: '/toy/:toyId',
        component: ToyDetails
    },
    {
        path: '/toy',
        component: ToyApp
    },
    {
        path: '/about',
        component: About,
    },
    {
        path: '/',
        component: HomePage,
    },
        // {
    //     path: '/user',
    //     component: UserProfile,
    // }
]