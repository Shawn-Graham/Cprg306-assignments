import Link from 'next/link';


export default function Home(){
    return(
        <div>
<h1 className="text-3xl font-bold text-center  m-2"><strong>CPRG 306: Web Development 2 - Assignments</strong></h1>
<ul className="text-center">
<li> <Link className="text-xl hover:text-blue-700" href="/week-2">Week 2</Link></li>
<li><Link className="text-xl hover:text-blue-700" href="/week-3">Week 3</Link></li>
<li><Link className="text-xl hover:text-blue-700"  href="/week-4">Week 4</Link></li>
<li><Link className="text-xl hover:text-blue-700"  href="/week-4">Week 4</Link></li>
<li><Link className="text-xl hover:text-blue-700" href="/week-5">Week 5</Link></li>
<li><Link className="text-xl hover:text-blue-700"  href="/week-6">Week 6</Link></li>
<li><Link className="text-xl hover:text-blue-700"  href="/week-7">Week 7</Link></li>
<li><Link className="text-xl hover:text-blue-700"  href="/week-8">Week 8</Link></li>
<li>Week 9</li>
<li>Week 10</li>
</ul>
    </div>
);
}