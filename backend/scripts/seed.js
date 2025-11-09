/* eslint-disable */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const Sport = require('../models/Sport');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sports-hub';

const sports = [
  {
    name: 'Cricket',
    description: 'Team sport played with bat and ball between two teams of eleven players.',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1200&auto=format&fit=crop',
    rules: 'Follow standard ICC rules for limited overs.',
    equipment: 'Bat, ball, stumps, pads, gloves.',
  },
  {
    name: 'Kabaddi',
    description: 'Contact team sport with raiders and defenders.',
    image: 'https://images.unsplash.com/photo-1559703248-dcaaec9fab78?q=80&w=1200&auto=format&fit=crop',
    rules: 'Standard circle style rules.',
    equipment: 'Sportswear, shoes, grip powder.',
  },
  {
    name: 'Basketball',
    description: 'Fast-paced game of two teams aiming to score by shooting a ball through a hoop.',
    image: 'https://images.unsplash.com/photo-1518065896235-4c246339dccb?q=80&w=1200&auto=format&fit=crop',
    rules: 'FIBA rules for 5v5.',
    equipment: 'Basketball, jerseys, shoes.',
  },
  {
    name: 'Throwball',
    description: 'Non-contact ball game played across a net.',
    image: 'https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?q=80&w=1200&auto=format&fit=crop',
    rules: 'Standard throwball federation rules.',
    equipment: 'Throwball, net, court.',
  },
  {
    name: 'Football',
    description: 'Two teams of eleven players attempt to score goals.',
    image: 'https://images.unsplash.com/photo-1486286701208-1d58e9338013?q=80&w=1200&auto=format&fit=crop',
    rules: 'IFAB laws of the game.',
    equipment: 'Football, boots, shin guards.',
  },
  {
    name: 'Badminton',
    description: 'Racquet sport played using racquets to hit a shuttlecock across a net.',
    image: 'https://images.unsplash.com/photo-1579273168836-1f2eab271141?q=80&w=1200&auto=format&fit=crop',
    rules: 'BWF rules for singles/doubles.',
    equipment: 'Racquets, shuttlecocks, net.',
  },
];

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    for (const s of sports) {
      const existing = await Sport.findOne({ name: s.name });
      if (existing) {
        console.log(`Skipping existing sport: ${s.name}`);
        continue;
      }
      const doc = new Sport(s);
      await doc.save();
      console.log(`Inserted sport: ${s.name}`);
    }

    console.log('Seeding complete.');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  }
}

run();
