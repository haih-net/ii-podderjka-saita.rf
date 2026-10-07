import { post6 } from './posts/Post6/data'
import { post5 } from './posts/Post5/data'
import { post4 } from './posts/Post4/data'
import { post3 } from './posts/Post3/data'
import { post1 } from './posts/Post1/data'
import { post2 } from './posts/Post2/data'
import type { Post } from './interfaces'

// Agent instruction: keep oldest-first narrative order. Readers follow the experiment
// from the beginning; append new posts at the end. Never reverse or sort newest-first.
// The visible index and structured data must share this same publication list.
export const posts: Post[] = [post1, post2, post3, post4, post5, post6]
