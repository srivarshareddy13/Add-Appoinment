// Write your code here
const AppoinmentItem = props => {
  const {details, toggleIsStarred} = props
  const {id, title, date, isFavourite} = details
  const staredImgUrl = isFavourite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleIsStarred(id)
  }

  return (
    <li>
      <div>
        <p>{title}</p>
        <button type="button" testid="star" onClick={onClickStar}>
          <img src={staredImgUrl} alt="star" />
        </button>
        <p>Date: {date}</p>
      </div>
    </li>
  )
}
export default AppoinmentItem
