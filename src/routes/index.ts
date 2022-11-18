import v1 from './v1/index';
import root from './root.route'

export default (app: any) => {
  app.use('/api/v1', v1);
  app.use(root);
};
