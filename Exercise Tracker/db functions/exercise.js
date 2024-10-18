const Exercise = require('../schemas/exercise');

exports.createAndSaveExercise = async(exerciseInfo, userInfo) => {
  const date = new Date(exerciseInfo.date);

  if (date == 'Invalid Date') date.setTime(Date.now());

  const newExercise = new Exercise({
    userId: userInfo._id,
    description: exerciseInfo.description,
    duration: exerciseInfo.duration,
    date: date.toDateString()
  });

  try {
    const savedExercise = await newExercise.save();
    
    return {
      username: userInfo.username,
      description: savedExercise.description,
      duration: savedExercise.duration,
      date: savedExercise.date,
      _id: userInfo._id
    };
  } catch (err) {
    return {error: err};
  }
}

exports.createExerciseLog = async(options, userInfo) => {
  try {
    let logs = await Exercise.find({userId: userInfo._id});

    if (options.from) {
      const fromDate = new Date(options.from);

      logs = logs.filter((Exercise) => ((new Date(Exercise.date)) >= fromDate));
    }

    if (options.to) {
      const toDate = new Date(options.to);

      logs = logs.filter((Exercise) => ((new Date(Exercise.date)) <= toDate));
    }

    if (options.limit) logs = logs.slice(0, Number(options.limit));

    logs = logs.map((log) => ({
      description: log.description,
      duration: log.duration,
      date: log.date
    }));

    return {
      username: userInfo.username,
      count: logs.length,
      _id: userInfo._id,
      log: logs
    };
  } catch (err) {
    return {error: err};
  }
}
