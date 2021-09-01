
export const handleScrollTopUtil = ()=> {
  setTimeout(()=>{
    window.scroll({
      top: document.body.offsetTop,
      left: 0,
      behavior: 'smooth',
    });
  }, 100);
}
