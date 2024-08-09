import React, { useEffect, useRef } from "react";
import "./HistorySection.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import project from "../assets/images/project-presentation-svgrepo-com.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLaptopCode,
  faMapMarkedAlt,
  faBriefcase,
  faGraduationCap,
  faCertificate,
  faAward,
  faChalkboardTeacher,
  faBook,
} from "@fortawesome/free-solid-svg-icons";

gsap.registerPlugin(ScrollTrigger);

const HistorySection = () => {
  const historyRef = useRef(null);

  useEffect(() => {
    const container = historyRef.current.querySelectorAll(".container");

    console.log(container);

    container.forEach((item, index) => {
      let icon = item.querySelector(".icon");
      let left = item.querySelector(".left");
      let right = item.querySelector(".right");
      let line = item.querySelector(".line-fill");
      let historyIcon = item.querySelector(".history-icon");

      gsap.set(left, { xPercent: -100, opacity: 0 });
      gsap.set(right, { xPercent: 100, opacity: 0 });

      ScrollTrigger.create({
        trigger: item,
        start: () => `-=${item.offsetHeight + item.offsetHeight / 3}`,
        end: () => `+=${item.offsetHeight + item.offsetHeight / 3}`,
        markers: true,
        scrub: 0.2,
        toggleActions: "play pause pause reset",
        onEnter: () => {
          if (index > 0) {
            const leftElement =
              container[index - 1].querySelector(".left-content");
            const rightElement =
              container[index - 1].querySelector(".right-content");

            if (leftElement != null) {
              gsap.set(leftElement, {
                opacity: 0.5,
              });
            }
            if (rightElement != null) {
              gsap.set(rightElement, { opacity: 0.5 });
            }
          }
          gsap.fromTo(
            left,
            { xPercent: -100, opacity: 0 },
            { xPercent: 0, opacity: 1, ease: "power2.out" }
          );
          gsap.fromTo(
            right,
            { xPercent: 100, opacity: 0 },
            { xPercent: 0, opacity: 1, ease: "power2.out" }
          );
          gsap.to(icon, { backgroundColor: "#576F8E" });
          gsap.to(line, { height: `100%`, opacity: 1 });
          gsap.to(historyIcon, { color: "#F2F2F2" });
        },

        onLeaveBack: () => {
          if (index > 0) {
            const lefttElement =
              container[index - 1].querySelector(".left-content");
            const righttElement =
              container[index - 1].querySelector(".right-content");

            if (lefttElement != null) {
              gsap.set(lefttElement, { opacity: 1 });
            }
            if (righttElement != null) {
              gsap.set(righttElement, { opacity: 1 });
            }
          }
          // gsap.to(historyIcon, { color: "#fff" });
          gsap.to(left, { xPercent: -100, opacity: 0, duration: 0.5 });
          gsap.to(right, { xPercent: 100, opacity: 0, duration: 0.5 });
          gsap.to(line, { height: `0%`, opacity: 0 });
          gsap.to(historyIcon, { color: "#000" });
        },
      });
    });
  });

  return (
    <>
      <div className="history-wrap" ref={historyRef}>
        <section className="history-left">
          <div className="content-container">
            <div className="left-icon">
              <img src={project} alt="project-icon" id="computer-icon" />
            </div>
            <div className="title">Diverse Project Experience</div>
            <div className="subtitle">
              "팀원과의 소통과 협력을 중요시하고 아이디어를 현실로 만드는"
            </div>
            <div className="description">
              <p>
                퍼블리싱, 프론트엔드, 풀스택 프로젝트를 통해 다양한 기술 스택을
                익혔으며,
              </p>
              <p>
                어떤 환경에서도 팀과 원활하게 소통하며 협력하여 문제를 해결하고
              </p>
              <p>성공적인 성과를 창출할 수 있는 능력을 갖추고 있습니다.</p>
            </div>
          </div>
        </section>

        <section className="history">
          <div className="init">
            <div className="container">
              <h1>개발 history</h1>
            </div>
            <div className="container">
              <div className="left">
                <div className="left-content-wrap">
                  <div className="left-content">
                    <h2>직업탐색</h2>
                    <p className="subtitle">직업 탐색 프로그램</p>
                    <p>
                      고용노동부에서 제공하는 직업 탐색 프로그램을 통해 진로를
                      확고히 함
                    </p>
                    <p>고용노동부</p>
                  </div>
                </div>
              </div>
              <div className="icon">
                <FontAwesomeIcon
                  icon={faMapMarkedAlt}
                  className="history-icon"
                />
              </div>
              <div className="line"></div>
              <div className="line line-fill"></div>
              <div className="right"></div>
            </div>

            <div className="container">
              <div className="left"></div>
              <div className="icon">
                <FontAwesomeIcon icon={faBook} className="history-icon" />
              </div>
              <div className="line"></div>
              <div className="line line-fill"></div>
              <div className="right">
                <div className="right-content-wrap">
                  <div className="right-content">
                    <h2>독학사</h2>
                    <p className="subtitle">컴퓨터 공학 전공</p>
                    <p>
                      독학사를 통해 자기 주도적으로 학습하며, 컴퓨터공학 기초
                      이론 학습 중
                    </p>
                    <p>평생교육진흥원</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="left">
                <div className="left-content-wrap">
                  <div className="left-content">
                    <h2>
                      직업훈련<span className="hour">(952H)</span>
                    </h2>
                    <p className="subtitle">풀스택 개발자 교육</p>
                    <p>(HTML, CSS, JavaScript, Java, Spring 등) 기술 습득</p>
                    <p>그린컴퓨터 아카데미 수원</p>
                  </div>
                </div>
              </div>
              <div className="icon">
                <FontAwesomeIcon
                  icon={faChalkboardTeacher}
                  className="history-icon"
                />
              </div>
              <div className="line"></div>
              <div className="line line-fill"></div>
              <div className="right"></div>
            </div>
            <div className="container">
              <div className="left"></div>
              <div className="icon">
                <FontAwesomeIcon
                  icon={faCertificate}
                  className="history-icon"
                />
              </div>
              <div className="line"></div>
              <div className="line line-fill"></div>
              <div className="right">
                <div className="right-content-wrap">
                  <div className="right-content">
                    <h2>IT 및 디자인 자격증</h2>
                    <p className="subtitle">자격증 취득</p>
                    <p>
                      정보처리 기능사 필기 및 실기
                      <br />
                      컴퓨터그래픽스 운용 기능사 필기
                      <br />
                      웹디자인 기능사 필기
                    </p>
                    <p>한국산업인력공단</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="left">
                <div className="left-content-wrap">
                  <div className="left-content">
                    <h2>수상</h2>
                    <p className="subtitle">작품발표회 우수상</p>
                    <p>
                      수업에 있어 성실하게 참여하였고, 작품발표회 1등으로
                      선정되어 우수상 수상
                    </p>
                    <p>그린컴퓨터아카데미</p>
                  </div>
                </div>
              </div>
              <div className="icon">
                <FontAwesomeIcon icon={faAward} className="history-icon" />
              </div>
              <div className="line"></div>
              <div className="line line-fill"></div>
              <div className="right"></div>
            </div>
            <div className="container">
              <div className="left"></div>
              <div className="icon">
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  className="history-icon"
                />{" "}
              </div>
              <div className="line"></div>
              <div className="line line-fill"></div>
              <div className="right">
                <div className="right-content-wrap">
                  <div className="right-content">
                    <h2>직업훈련 수료</h2>
                    <p className="subtitle">과정 수료</p>
                    <p>교육과정을 성실히 이수하여 수료증을 취득함</p>
                    <p>그린컴퓨터아카데미</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="left">
                <div className="left-content-wrap">
                  <div className="left-content">
                    <h2>청년취업사관학교</h2>
                    <p className="subtitle">온라인 풀스택 과정 수강</p>
                    <p>(Node.js, Express 등) 기술 습득하여 역량 강화</p>
                    <p>청년취업사관학교 </p>
                  </div>
                </div>
              </div>
              <div className="icon">
                <FontAwesomeIcon
                  icon={faChalkboardTeacher}
                  className="history-icon"
                />
              </div>
              <div className="line"></div>
              <div className="line line-fill"></div>
              <div className="right"></div>
            </div>
            <div className="container">
              <div className="left"></div>
              <div className="icon">
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  className="history-icon"
                />{" "}
              </div>
              <div className="line"></div>
              <div className="line line-fill"></div>
              <div className="right">
                <div className="right-content-wrap">
                  <div className="right-content">
                    <h2>청년취업사관학교</h2>
                    <p className="subtitle">과정 수료</p>
                    <p>교육과정을 성실히 이수하여 수료증을 취득함</p>
                    <p>그린컴퓨터아카데미</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="left">
                <div className="left-content-wrap">
                  <div className="left-content">
                    <h2>일자리 사업</h2>
                    <p>모던웹 풀스택 개발자 과정</p>
                    <p>
                      프론트엔드 및 백엔드 실무 기술 습득 (Sass, React, Gsap,
                      Node.js 등)
                    </p>
                    <p>중소기업청, 이젠컴퓨터아카데미</p>
                  </div>
                </div>
              </div>
              <div className="icon">
                <FontAwesomeIcon icon={faBriefcase} className="history-icon" />
              </div>
              <div className="line"></div>
              <div className="line line-fill"></div>
              <div className="right"></div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HistorySection;
