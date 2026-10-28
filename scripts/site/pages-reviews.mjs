// Reviews page: word-for-word excerpts from her Google reviews, grouped by what people booked for.
// review() checks every quote against data/reviews-hamilton.json and links the full review.
// No review count and no review markup (self-serving reviews aren't eligible for stars anyway).
import { review, BIZ } from './core.mjs';
import { icon } from './layout.mjs';
import { pageHero, sec, quote, quotes, ctaCard, ctaRow, ctaBand, withCta } from './ui.mjs';
import { artReviews } from './art.mjs';

export function reviewsPage() {
  const path = '/reviews/';
  const trail = [['Home', '/'], ['Reviews', path]];
  const main = [
    pageHero({
      trail, script: 'in their own words', h1: 'Mrs. Akbar&rsquo;s student reviews',
      lede: 'Word for word from her Google reviews in Hamilton, where she&rsquo;s rated 5.0. Every quote links to the full review, so you can read the rest.',
      art: artReviews(),
    }),
    withCta(sec({
      id: 'female', tone: 'white', script: 'why they picked her', title: 'A female instructor, and a calm one',
      body: quotes([
        quote(review('Aleena Khan', 'I was looking for a female instructor due to personal preference and comfort', 'since I can be an anxious driver.'), 'passed the G2, first try'),
        quote(review('Daniya Maqsood', 'She is very kind and gentle and makes you feel comfortable in the car.', 'with positive notes.'), 'passed the G'),
      ]),
    }), ctaCard({ where: 'reviews-card', script: 'your turn', title: 'Want lessons like these?', text: 'Call or text to book. She comes to you, anywhere in Hamilton, 7 days a week by appointment.' })),
    sec({
      id: 'nervous', tone: 'paper', script: 'nervous at the start', title: 'From people who were nervous',
      meta: 'More on <a href="/driving-lessons-for-nervous-drivers/">lessons for nervous drivers</a>.',
      body: quotes([
        quote(review('priyanka saha', 'As a nervous driver, her calm and reassuring approach really helped me build confidence behind the wheel.')),
        quote(review('Stephanie', 'She completely helped me overcome my test anxiety', 'until i felt 100% confident.'), 'passed the G2, first try'),
        quote(review('Katherine Yashchenko', 'After just a few lessons, I already feel much more confident behind the wheel.')),
        quote(review('Yshee Estares', 'She gave me the confidence I needed to pass and feel safe driving on my own.')),
      ]),
    }),
    sec({
      id: 'g2', tone: 'sand', script: 'test day', title: 'Passed the G2',
      meta: 'More on <a href="/g2-road-test-preparation/">G2 road test preparation</a>.',
      body: quotes([
        quote(review('Hawa Drammeh', 'Just passed my G2 road test today!', 'she teaches so so well.'), 'passed the G2'),
        quote(review('Sughra Abid', 'She has a structured and patient teaching style', 'on the first attempt'), 'passed the G2, first try'),
        quote(review('anamm iftikhar', 'I got my G2 in my first attempt as I was beginner.'), 'beginner, passed the G2'),
        quote(review('Francis Daniels', 'Very patient instructor, she practiced with me until I got it right.', 'she will teach you that.')),
      ]) + ctaRow({ where: 'reviews-g2', text: 'Ready to be next?', stars: true }),
    }),
    sec({
      id: 'g', tone: 'white', script: 'the full licence', title: 'Passed the G',
      meta: 'More on <a href="/g-road-test-preparation/">G test and highway lessons</a>.',
      body: quotes([
        quote(review('mariam abass', 'After her lessons I felt very well prepared for my road test.', 'pass my G test on the first try.'), 'passed the G, first try'),
        quote(review('Priscilla Anwar Siani', 'She always provides clear and helpful tips.', 'thanks to Mrs. Akbar!'), 'passed the G'),
        quote(review('Maher Ahmad', 'She helped me prepare for the G test', 'pass on the first try!'), 'passed the G, first try'),
      ]),
    }),
    sec({
      id: 'parking', tone: 'paper', script: 'the bit everyone dreads', title: 'Parking, sorted',
      meta: 'More on <a href="/parallel-parking-lessons/">parallel parking lessons</a>.',
      body: quotes([
        quote(review('Katherine Yashchenko', 'She helped me understand the little details of parking', 'different situations on the road.')),
        quote(review('Malaika J', 'She makes parallel parking and reverse parking so easy.'), 'passed on the first try'),
        quote(review('Oeindrila Chaudhuri', 'She helped me build confidence on the road', 'park in tight spaces.'), 'getting ready for the G'),
      ]),
    }),
    sec({
      id: 'teaching', tone: 'sand', script: 'how she teaches', title: 'Patient, clear and flexible',
      body: quotes([
        quote(review('Zeinab Amin', 'She is a very knowledgeable and patient instructor.')),
        quote(review('salami eniola', 'She gives relatable tips to understand the signs and rules of driving.')),
        quote(review('Heremela Molla', 'She has very flexible schedule for students and working professionals.')),
        quote(review('Ben', 'Highly recommend for anyone looking for quick, on demand lessons.')),
        quote(review('Mila Alieva', 'With your guidance and patience you taught me the skills to become a safe driver.')),
      ]) + ctaRow({ where: 'reviews-teaching', text: 'Still have a question?' }),
    }),
    sec({
      id: 'all', tone: 'white', script: 'the whole list', title: 'Read every review on Google',
      body: `<div class="prose" data-reveal><p>These are short excerpts. Her Google Business Profile has every review in full, and her students in Brampton left plenty more before she moved to Hamilton.</p></div>
<div class="reviews-out" data-reveal>
  <a class="btn btn--dark" href="${BIZ.gbp}" target="_blank" rel="noopener">${icon('star')}<span>Her Hamilton reviews</span><span class="visually-hidden"> (opens Google Maps in a new tab)</span></a>
  <a class="btn btn--ghost" href="${BIZ.gbpBrampton}" target="_blank" rel="noopener"><span>Her Brampton reviews</span><span class="visually-hidden"> (opens Google Maps in a new tab)</span></a>
</div>`,
    }),
    ctaBand({ title: 'Book your first lesson', text: 'Call or text 7 days a week. She comes to you, so your lesson starts where you are.' }),
  ].join('\n');
  return {
    type: 'reviews', path, trail, name: 'Reviews', h1: 'Mrs. Akbar’s student reviews',
    title: 'Mrs. Akbar Driving Instructor Reviews | Hamilton',
    description: 'What students say about Mrs. Akbar, a female driving instructor in Hamilton: patient, calm and clear. Read her Google reviews in their own words.',
    main, ogScript: 'in their own words',
  };
}
