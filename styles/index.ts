const styles = {
  absoluteCenter: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  // hero section
  heroHeading:
    "font-bold lg:text-[144px] md:text-[100px] sm:text-[60px] text-[44px] lg:leading-[158.4px] md:leading-[114.4px] sm:leading-[74.4px] leading-[64.4px] uppercase text-white",
  heroDText:
    "md:w-[212px] sm:w-[80px] w-[60px] md:h-[108px] sm:h-[48px] h-[38px] md:border-[18px] border-[9px] rounded-r-[50px] border-white sm:mx-2 mx-[6px]",
  title: "mt-[8px] font-bold md:text-[64px] text-[40px]",
  typingText: "font-normal text-[14px]",
  innerWidth: "2xl:max-w-[1280px] w-full",
  paddings: "sm:p-16 xs:p-8 px-6 py-12",

  loopingBorder: `absolute rounded-md p-2 before:content-[''] before:w-[110%] before:h-8 before:bg-gradient-to-l before:from-white
  before:to-green-600 before:animate-rotate before:-z-10 before:top-1/2 before:left-1/2 before:[translate:-50%_-50%]
  before:absolute z-10 overflow-hidden after:absolute after:bg-black after:inset-1 after:rounded-md after:-z-10`,

  htmlVerifyButton: `display:block;
  cursor: pointer;
  transition: ease-in .1s;
  border:1px solid white;
  text-align:center;
  font-weight:900;
  font-size:30px;
  color:white;
  text-decoration:none;
  border-radius: 10px;
  max-width: 150px;
  margin: 50px auto 30px auto;`
}

export default styles
