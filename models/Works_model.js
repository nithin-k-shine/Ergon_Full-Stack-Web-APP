const mongoose = require('mongoose');
const slugify = require('slugify');

const Works_Schema = new mongoose.Schema({
        name: {
          type: String,
          required: [true, 'A Work must have a name'],
          unique: true,
          trim: true,
          maxlength: [40, 'A work name must have less or equal then 40 characters'],
          minlength: [10, 'A work name must have more or equal then 10 characters']
          // validate: [validator.isAlpha, 'Tour name must only contain characters']
        },
        slug: String,
        duration: {
          type: String,
          required: [true, 'A work must have a duration']
        },
        TeamSize: {
          type: Number,
          required: [true, 'A work must have a team size']
        },
        TeamMembers: {
            type:[String],
            required:[true, 'A work must have team members']
        },
        priority: {
          type: String,
          required: [true, 'A work must have a priority'],
          enum: {
            values: ['Low', 'Moderate', 'High'],
            message: 'Priority is either: Low, Moderate or High'
          }
        },
        summary: {
          type: String,
          trim: true,
          required: [true, 'A work must have a description']
        },
        description: {
          type: String,
          trim: true
        },
        startDate: Date,
        dueDate:Date,
        secretWork: {
          type: Boolean,
          default: false
        }
},
{
  ToJSON: {virtuals: true},
  ToObject: {virtuals: true}
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
Works_Schema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Work = mongoose.model('Work',Works_Schema);
Works_Schema
    .set('toObject', { getters: true })
    .set('toJSON',{getters:true});
module.exports = Work;