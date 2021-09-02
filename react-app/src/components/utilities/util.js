export const reduceStringAttachDots = (amount_want, string_to_reduce) =>{
  return string_to_reduce.slice(0,amount_want) + '...'
}
export const reduceStringIfLongThan = (string_to_reduce, longer_than_amount=50, amount_to_reduce=50, ) =>{
  return string_to_reduce.length > longer_than_amount ? string_to_reduce.slice(0,amount_to_reduce) + '...': string_to_reduce;
}

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
  if (difference_days > 0 && difference_days <2 ) return `${difference_days} day ago`
  if (difference_days > 0) return `${difference_days} days ago`
  if (difference_hours > 0 && difference_hours <2 ) return `${difference_hours} hour ago`
  if (difference_hours > 0) return `${difference_hours} hours ago`
  if (difference_minutes > 0 && difference_minutes <2 ) return `${difference_minutes} minute ago`
  if (difference_minutes > 0) return `${difference_minutes} minutes ago`
  return `seconds ago`
}
