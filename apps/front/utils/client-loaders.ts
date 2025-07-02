'use client'

import { getAbout, getArticle, getArticles, getBlog, getContact, getEntreprise, getMariage } from "@/data/loaders";

// Client-side wrapper functions
export const clientGetMariage = (locale: string) => getMariage(locale);
export const clientGetAbout = (locale: string) => getAbout(locale);
export const clientGetEntreprise = (locale: string) => getEntreprise(locale);
export const clientGetContact = (locale: string) => getContact(locale);
export const clientGetBlog = (locale: string) => getBlog(locale);
export const clientGetArticles = (locale: string) => getArticles(locale);
export const clientGetArticle = (slug: string, locale: string) => getArticle(slug, locale);