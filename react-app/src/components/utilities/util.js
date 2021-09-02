
export const handleScrollTopUtil = ()=> {
  setTimeout(()=>{
    window.scroll({
      top: document.body.offsetTop,
      left: 0,
      behavior: 'smooth',
    });
  }, 100);
}

export const process_date = ({difference_months,difference_days,difference_hours,difference_minutes}) =>{
  if (difference_months > 0) return `${difference_months} months ago`
  if (difference_days > 0) return `${difference_days} days ago`
  if (difference_hours > 0) return `${difference_hours} hours ago`
  if (difference_minutes > 0) return `${difference_minutes} minutes ago`
  return `seconds ago`
}
