import HomePage from '../Pages/HomePage/Container'
import AuthorList from '../Pages/AuthorList/Container'
import AuthorEditor from '../Pages/Author/Container'
import Logout from '../Pages/Logout/Container'
import StoryEditor from '../Pages/StoryEditor/Container'
import StoryList from '../Pages/StoryList/Container'
import StoryCategoryList from '../Pages/StoryList/ContainerCategory'
import StoryAuthorList from '../Pages/StoryList/ContainerAuthor'
import System from '../Pages/System/Container'

const config = [
  {
    path: '/',
    title: 'Category',
    component: HomePage
  },
  {
    path: '/author',
    title: 'Author',
    component: AuthorList
  },
  {
    path: '/author/:id',
    title: 'Author Editor',
    isSidebar: false,
    component: AuthorEditor
  },
  {
    path: '/storys/:id',
    title: 'Story Editor',
    isSidebar: false,
    component: StoryEditor
  },
  {
    path: '/storys',
    title: 'Storys',
    component: StoryList
  },
  {
    path: '/storys/category/:id',
    title: 'Storys of Category',
    isSidebar: false,
    component: StoryCategoryList
  },
  {
    path: '/storys/authors/:id',
    title: 'Storys of Author',
    isSidebar: false,
    component: StoryAuthorList
  },
  {
    path: '/system',
    title: 'System',
    icon: 'dashboard',
    component: System
  },
  {
    path: '/logout',
    title: 'Logout',
    component: Logout
  }
]

export default config
