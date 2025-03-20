import { PORT } from '@config';

import { app } from './app';

app.listen(PORT, () => {
  console.log('App working on port', PORT);
});
