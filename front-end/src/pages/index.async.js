import asyncComponent from 'services/asyncComponent';

export const HomePage = asyncComponent(() => import('./home/HomePage'));
export const QuestionListPage = asyncComponent(() => import('./question/QuestionListPage'));
export const QuestionReadPage = asyncComponent(() => import('./question/QuestionReadPage'));
export const QuestionWritePage = asyncComponent(() => import('./question/QuestionWritePage'));
export const LoginPage = asyncComponent(() => import('./auth/LoginPage'));
export const JoinPage = asyncComponent(() => import('./auth/JoinPage'));

export const PostListPage = asyncComponent(() => import('./post/PostListPage'));