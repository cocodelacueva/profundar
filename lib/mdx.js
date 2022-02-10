import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

const root = process.cwd();

export const getFiles = async () => fs.readdirSync( path.join(root, '_posts') );


export const getFilesBySlug = async ( slug ) => {
    const mdSource = fs.readFileSync(
        path.join(root, '_posts', `${slug}.md`), 
        'utf-8'
    );
        

    const { data, content } = await matter(mdSource);
    const source = await serialize(content, {scope:data});
    
    return {
        source,
        frontmatter: {
            slug, 
            ...data,

        }
    }
}

export const getAllFilesMetaData = async () => {
    const files = fs.readdirSync( path.join(root, '_posts') );

    return files.reduce( (allPosts, postSlug) => {
        const mdSource = fs.readFileSync(
            path.join(root, '_posts', postSlug) );
            const { data } = matter(mdSource);
        return [
            {...data, slug: postSlug.replace('.md', ''), },
            ...allPosts, 
        ]
    }, []);

}

export const orderByDataDesc = (prev, current) =>
    new Date(current.date) - new Date(prev.date);