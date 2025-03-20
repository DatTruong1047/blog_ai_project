import ansicolor from 'ansicolor';

import { PostCreateDTO } from '@app/models';
import { create, find } from '@app/services/post.service';

import { crawlDataByUrl } from '../modules/crawl.module';
import { getAIResponse } from '../modules/genAI.module';

export interface ArgumentsCrawl {
  url: string;
  style?: string;
  category?: string;
}

export const handler = async (argv: ArgumentsCrawl) => {
  try {
    const style = argv.style || 'article';
    const category = argv.style || 'news';

    if (!argv.url) {
      console.log(ansicolor.red('URL is required'));
      return;
    }
    // Tim kiem bai POST trong DB
    const existPost = await find(argv.url, style);

    if (existPost) {
      console.log(ansicolor.green(`This post had already existed, postID = ${existPost.id}`));
      // addToCache(url, existPost.id, style);
      return;
    }

    const data = await crawlDataByUrl(argv.url);

    if (!data) {
      console.log(ansicolor.red('Failed to crawl data'));
      return;
    }

    const content = data.join('\n');
    const response = await getAIResponse(content, argv.style); // Nhận câu trả lời từ AI

    if (!response.content || !response.title) {
      console.log(ansicolor.red('Failed to get a valid response from AI'));
      return;
    }

    const creatPostDto: PostCreateDTO = {
      title: response.title,
      content: response.content,
      categoryName: category,
      style,
      url: argv.url,
    };
    const post = await create(creatPostDto);

    console.log(ansicolor.blue(`Save post successful: ${post.id}`));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(ansicolor.red(`Crawl data error: ${error.message}`));
    } else {
      console.error(ansicolor.red(`An unknown error occurred: ${error}`));
    }
  }
};
