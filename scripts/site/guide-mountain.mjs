// Guide: Hamilton's Mountain accesses. Roads, ends and tags from OpenStreetMap (checked 2026-10-06);
// climbs are rough estimates from a 90 m elevation grid, so they're always given as "about".
import { guidePage, SRC } from './pages-guides.mjs';
import { callout, inlineCta, quote } from './ui.mjs';
import { review } from './core.mjs';

const p = (...paras) => paras.map((x) => `<p>${x}</p>`).join('');
const ul = (items) => `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
const OSM = ['Road details: map data &copy; OpenStreetMap contributors (openstreetmap.org)', 'https://www.openstreetmap.org/copyright'];

const access = (name, html) => `<h3>${name}</h3>${html}`;

export function mountainGuide() {
  return guidePage({
    slug: 'driving-the-hamilton-mountain-accesses',
    title: 'Hamilton Mountain Accesses: A New Driver’s Guide | Mrs. Akbar',
    description: 'The Jolley Cut, Claremont, Sherman and Kenilworth Accesses, James Mountain Road and Beckett Drive: what each Mountain access is like and how to drive it.',
    script: 'hamilton roads',
    dek: 'The roads that climb Hamilton&rsquo;s escarpment, one by one, and how to drive them up and down.',
    intro: 'Hamilton is split in two by the Niagara Escarpment. Locals call the top &ldquo;the Mountain&rdquo;, and the roads that climb it are the Mountain accesses. If you live in Hamilton, you&rsquo;ll drive them eventually, so it&rsquo;s worth knowing what each one is like.',
    sections: [
      { id: 'what', h: 'What makes them different', html: p(
        'Each access climbs somewhere around 50 to 100 metres in a kilometre or two. That&rsquo;s enough to change how a car behaves: going up, it slows unless you add gas; coming down, it speeds up unless you hold it back.',
        'None of this is dangerous once you know what to expect. It just takes a bit of practice, ideally on a quiet morning before you try them at rush hour.') },
      { id: 'accesses', h: 'The accesses, one by one', toc: 'The accesses', html:
        access('The Jolley Cut', p('Runs from John Street South and St. Joseph&rsquo;s Drive up to Concession Street and Upper Wellington Street. Four lanes, traffic both ways, and a climb of roughly 70 metres over about a kilometre and a half. At the top you come out at Concession Street, a slower main street.')) +
        access('The Claremont Access', p('Runs from the Wellington Street South and Hunter Street area up to Upper James Street. It&rsquo;s a divided road, so each direction has its own lanes, and it climbs about 100 metres over close to two kilometres: the biggest climb of the main accesses. It&rsquo;s also one of the faster ones, so merging at the top takes attention.')) +
        access('The Sherman Access', p('Runs from Charlton Avenue East up toward Mountain Park Avenue, climbing about 80 metres over a little more than two kilometres. Trucks aren&rsquo;t allowed on parts of it.')) +
        access('The Kenilworth Access', p('Climbs from the east end near Lawrence Road up to Mountain Brow Boulevard, about 80 metres in all. Near the top there&rsquo;s a circular junction where Kenilworth Avenue South and Kimberly Drive meet, so read the signs as you arrive.')) +
        access('James Mountain Road', p('Short and steep: about 66 metres up in roughly three quarters of a kilometre, from James Street South to West 5th Street and Claremont Drive. It&rsquo;s the steepest of the main accesses, at a grade of around 9 to 10 percent, and it&rsquo;s only two lanes wide.')) +
        access('Beckett Drive', p('Climbs from Queen Street South up to Garth Street, about 50 metres in under a kilometre. A useful one to know if you live in the west end.')) +
        callout('local', 'Mountain Brow Boulevard', p('Not every road near the edge is an access. Mountain Brow Boulevard runs along the top of the escarpment rather than up it, which makes it a gentle place to get used to the Mountain before you tackle a climb.')) },
      { id: 'up', h: 'Driving up', html: ul([
        '<strong>Keep a steady speed.</strong> Press a little more gas as the climb starts, so the car doesn&rsquo;t slow down halfway up.',
        '<strong>Leave extra space.</strong> If the car ahead stops on the hill, you want room to stop gently too.',
        '<strong>If you do have to stop,</strong> hold the brake, then move to the gas smoothly. Many newer cars have hill-start assist, which holds the brake for a moment while you switch pedals.',
        '<strong>Look ahead to the top.</strong> Most accesses end at a busy intersection, so be ready for lights and merging traffic as the road levels out.',
      ]) },
      inlineCta('Nervous about the Mountain? Practise it with Mrs. Akbar beside you.'),
      { id: 'down', h: 'Driving down', html: ul([
        '<strong>Ease off the gas early.</strong> Gravity does the work on the way down.',
        '<strong>Brake gently and steadily</strong> instead of riding the brake the whole way. Many automatic cars let you choose a lower gear, which helps hold your speed.',
        '<strong>Keep at least two seconds</strong> behind the car ahead, and more in rain or snow.',
        '<strong>Watch the bottom.</strong> Most accesses end at busy lower-city streets, so plan your lane before you get there.',
      ]) },
      { id: 'winter', h: 'In winter', html: p('Climbs and shady curves can be icy when the rest of the city is only wet, and bridges and overpasses freeze first. Slow down well before the hill, leave lots of room, and avoid stopping partway up if you can. The <a href="/guides/winter-driving-in-hamilton/">winter driving guide</a> has more.') },
      { id: 'beyond', h: 'Other escarpment roads around Hamilton', toc: 'Elsewhere', html: p('The escarpment runs right across the area, so there are climbs outside the city too:') +
        ul([
          '<strong>Dundas:</strong> Sydenham Road and Highway 8 both climb well over 100 metres out of town. See <a href="/driving-lessons-dundas/">lessons in Dundas</a>.',
          '<strong>Stoney Creek:</strong> Centennial Parkway, New Mountain Road and Dewitt Road. See <a href="/driving-lessons-stoney-creek/">lessons in Stoney Creek</a>.',
          '<strong>Ancaster:</strong> Wilson Street East, Old Dundas Road and Sulphur Springs Road. See <a href="/driving-lessons-ancaster/">lessons in Ancaster</a>.',
        ]) + quote(review('Gaurav Singh', 'including lane changes, parallel parking, three-point turns, uphill/downhill parking', 'defensive driving.'), 'passed the G2, first try') },
    ],
    sources: [OSM, SRC.handbookWeather, SRC.handbookParking],
    faqs: [
      ['Which Hamilton Mountain access is the steepest?', 'James Mountain Road. It&rsquo;s short but steep, at a grade of around 9 to 10 percent.'],
      ['Which access climbs the most?', 'The Claremont Access, which rises about 100 metres over close to two kilometres between the lower city and Upper James Street.'],
      ['How should I park on a steep street?', 'Facing downhill, turn your front wheels toward the curb. Facing uphill with a curb, turn them toward the road; uphill with no curb, turn them sharply right. Then set the parking brake.'],
    ],
    related: ['winter-driving-in-hamilton', 'how-to-parallel-park', 'nervous-driver-tips'],
    lessons: [{ href: '/driving-lessons-hamilton/', label: 'Lessons in Hamilton' }, { href: '/driving-lessons-dundas/', label: 'Lessons in Dundas' }, { href: '/driving-lessons-for-nervous-drivers/', label: 'Nervous drivers' }],
    cta: ['Practise the Mountain safely', 'Tell her which access worries you. That&rsquo;s a good place to start.'],
  });
}
