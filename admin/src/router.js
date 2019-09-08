import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import CategoryEdit from './views/Category/CategoryEdit.vue'
import CategoryList from './views/Category/CategoryList.vue'

import ItemEdit from './views/Item/ItemEdit.vue'
import ItemList from './views/Item/ItemList.vue'

import HeroEdit from './views/Hero/HeroEdit.vue'
import HeroList from './views/Hero/HeroList.vue'

import ArticleEdit from './views/Article/ArticleEdit.vue'
import ArticleList from './views/Article/ArticleList.vue'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'main',
        component: Main,
        children: [
            { path: '/categories/create', component: CategoryEdit },
            { path: '/categories/edit/:id', component: CategoryEdit, props: true },
            { path: '/categories/list', component: CategoryList },

            { path: '/items/create', component: ItemEdit },
            { path: '/items/edit/:id', component: ItemEdit, props: true },
            { path: '/items/list', component: ItemList },

            { path: '/heros/create', component: HeroEdit },
            { path: '/heros/edit/:id', component: HeroEdit, props: true },
            { path: '/heros/list', component: HeroList },

            { path: '/articles/create', component: ArticleEdit },
            { path: '/articles/edit/:id', component: ArticleEdit, props: true },
            { path: '/articles/list', component: ArticleList },
        ]
    }]
})