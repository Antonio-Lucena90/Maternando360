import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import userRouter from './modules/user/user.routes.js'
import adminRouter from './modules/admin/admin.routes.js'
import workshopRouter from './modules/workshops/workshops.routes.js'
import reviewsRouter from './modules/reviews/reviews.routes.js';
import appointmentRouter from './modules/appointment/appointment.routes.js';
import messageRouter from './modules/message/message.routes.js';
import cors from 'cors';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
const app = express();

app.use(cors())
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/user', userRouter); 
app.use('/admin', adminRouter); 
app.use('/workshop', workshopRouter); 
app.use('/reviews', reviewsRouter); 
app.use('/appointments', appointmentRouter);
app.use('/message', messageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).json({ message: err.message || 'Error interno del servidor' });
});

export default app;
