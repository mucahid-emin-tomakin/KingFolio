import Image from "next/image";
import Gefreiter from "@/public/webp/Gefreiter.webp";
export function SKILLS() {
  return (
    <section className="skills" id="skills" aria-labelledby="skills-heading">
      <div className="max-width">
        <h2 className="title" id="animated">My skills</h2>
        <div className="skills-content">
          <div className="column left">
            <div className="leftleft fade-left" /*id="downtop"*/>
              <Image src={Gefreiter} className="img-down reveal" alt="Card Back" style={{ height: "auto", width: "auto" }} />
              {/*<Image src={Gefreiter} className="img-top" alt="Card Front" height={450} style={{ width: "auto" }} />*/}
            </div>
            <div className="leftright">
              <div className="reveal text fade-bottom">
                Meine Fähigkeiten &amp; Erfahrungen
              </div>
              <p className="reveal fade-right">
                Meine Leidenschaft für das Digitale begann an der HTL – dort, wo man lernt, dass ein fehlendes Semikolon ganze Nachmittage kosten kann 😅
                Irgendwo zwischen blinkenden LEDs, Codezeilen und der Frage, warum der Roboter schon wieder nach links statt nach rechts fährt, entstand meine Neugier auf das Unsichtbare hinter dem Bildschirm 🖥️🪄<br /><br />
                Ich wollte verstehen, wie aus Code Bewegung wird – wie Sensoren fühlen, Motoren denken und Systeme reagieren.
                Manchmal als Roboter, manchmal als Web-App – immer mit einer Prise Neugier ✨<br /><br />
                Heute bewege ich mich in der Welt der Prozessautomatisierung, doch das Staunen von damals ist geblieben:<br /><br /> 
                Wie aus Logik Kreativität entsteht 🎨 – oder aus einer 0/1 plötzlich Leben 💡.
              </p>
              <br />
            </div>
          </div>
          <div className="reveal column right fade-bottom">
            <div className="bars">
              <div className="info">
                <span>Python Development</span>
                <span aria-hidden="true">80%</span>
                <span className="sr-only">Python Development skill level: 80 percent</span>
              </div>
              <div className="line python" />
            </div>
            <div className="bars">
              <div className="info">
                <span>RPA & Automation</span>
                <span aria-hidden="true">90%</span>
                <span className="sr-only">RPA & Automation skill level: 90 percent</span>
              </div>
              <div className="line rpa" />
            </div>
            <div className="bars">
              <div className="info">
                <span>Enterprise Scripting</span>
                <span aria-hidden="true">85%</span>
                <span className="sr-only">Enterprise Scripting skill level: 85 percent</span>
              </div>
              <div className="line scripting" />
            </div>
            <div className="bars">
              <div className="info">
                <span>Web Development</span>
                <span aria-hidden="true">75%</span>
                <span className="sr-only">Web Development skill level: 75 percent</span>
              </div>
              <div className="line web" />
            </div>
            <div className="bars">
              <div className="info">
                <span>C/C++ Embedded</span>
                <span aria-hidden="true">70%</span>
                <span className="sr-only">C/C++ Embedded skill level: 70 percent</span>
              </div>
              <div className="line cpp" />
            </div>
            <div className="bars">
              <div className="info">
                <span>Linux & Systems</span>
                <span aria-hidden="true">80%</span>
                <span className="sr-only">Linux & Systems skill level: 80 percent</span>
              </div>
              <div className="line linux" />
            </div>
            <div className="bars">
              <div className="info">
                <span>Machine Learning</span>
                <span aria-hidden="true">70%</span>
                <span className="sr-only">Machine Learning skill level: 70 percent</span>
              </div>
              <div className="line ml" />
            </div>
            <div className="bars">
              <div className="info">
                <span>SQL & Databases</span>
                <span aria-hidden="true">60%</span>
                <span className="sr-only">SQL & Databases skill level: 60 percent</span>
              </div>
              <div className="line sql" />
            </div>
            <div className="bars">
              <div className="info">
                <span>DevOps & Git</span>
                <span aria-hidden="true">70%</span>
                <span className="sr-only">DevOps & Git skill level: 70 percent</span>
              </div>
              <div className="line devops" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}