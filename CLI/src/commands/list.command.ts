import ansicolor, { underline } from 'ansicolor';
import { Arguments } from 'yargs';

import { PostResponseDTO } from '../models';
import { getList } from '../services/post.service';

// Hàm giới hạn độ dài text trả về.
const truncateString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + '...';
};

export const handler = async (argv: Arguments): Promise<PostResponseDTO[] | null> => {
  try {
    const take = argv?.take as number;
    const skip = argv?.skip as number;
    const style = argv?.style as string | undefined;

    const listPost = await getList({ take, skip, style });

    if (!listPost || listPost.length === 0) {
      console.log(ansicolor.red('No post found'));
      return;
    }

    console.log(ansicolor.green('List of post'));
    listPost.forEach((post, index) => {
      console.log(ansicolor.blue(`--- Post ${index + 1} ---`));
      console.log(ansicolor.yellow(`Title: ${truncateString(post.title, 80)}`)); // Gioi han 80 ky tu
      console.log(ansicolor.bgLightGray(`Content: ${truncateString(post.content, 300)}`)); // gioi han content 300 ký tự
      console.log(ansicolor.magenta(`ID: ${post.id}`));
      console.log();
    });
  } catch (error) {
    console.error(ansicolor.red(`Error:, ${error.message}`));
  }
};
