import { useState } from "react"
import PropTypes from "prop-types";
import { motion } from "framer-motion"
// import { useEffect } from "react"
import useAxios from "../../../../hooks/axios";
import { useNavigate } from "react-router-dom";

function timeAgo(timestamp) {
  const now = new Date();
  const date = new Date(timestamp);
  const elapsedMilliseconds = now - date;
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  const elapsedDays = Math.floor(elapsedHours / 24);

  if (elapsedDays > 1) {
    return `${elapsedDays} days ago`;
  } else if (elapsedDays === 1) {
    return `1 day ago`;
  } else if (elapsedHours > 1) {
    return `${elapsedHours} hours ago`;
  } else if (elapsedHours === 1) {
    return `1 hour ago`;
  } else if (elapsedMinutes > 1) {
    return `${elapsedMinutes} minutes ago`;
  } else if (elapsedMinutes === 1) {
    return `1 minute ago`;
  } else {
    return `just now`;
  }
}


const PostE = ({ post, liked, saved, toggleLike, toggleSave, openComment, viewMode }) => {
  const axiosInstance = useAxios()
  const navigate = useNavigate()
  const [comment, setComment] = useState("");

  const addComment = (postId) => {
    axiosInstance.post("/newPostComment", { postId: postId, commentText: comment }).then((res) => {
      console.log(res)
      setComment("")
    }).catch((err) => { console.log(err) })
  }
  const [isContentExpanded, setContentExpanded] = useState(false);

  const toggleContentExpansion = () => {
    setContentExpanded(!isContentExpanded);
  };

  return (
    <div className="mt-3">
      <div className="w-full">
        <img
          className="w-full object-cover rounded-lg"
          src={post.Image_Video_url}
          alt=""
        />
      </div>
      {viewMode ? (<div className="my-2 text-justify">{post?.PostContent ? (<p>
        {isContentExpanded
          ? post?.PostContent // Show full content when expanded
          : post?.PostContent?.split(" ").slice(0, 30).join(" ") // Show first 100 words when truncated
        }
        {post.PostContent.split(" ").length > 30 && (
          <span className="cursor-pointer text-primary p-2" onClick={toggleContentExpansion}>
            {isContentExpanded ? "See Less" : "See More"}
          </span>
        )}
      </p>) : null} </div>) : null}
      <div id="first" className='flex justify-between items-center gap-4 items-center my-2'>
        <div onClick={() => { navigate(`/profile/${post.user_id._id}`) }} className="flex items-center cursor-pointer gap-5">
          <div className='w-14 my-2'>
            <div className='element-with-gradient w-full p-[2px] rounded-full relative'>
              <img className='w-full rounded-full border-4 border-white' src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBIRFRgSFRUYGBgZGBgYGBoZERgYGhgaGBgZGRgYGBocIS4lHh4rHxgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHxISHjErJCQ0NDQ2NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQxNDQ0NP/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAABAAIDBQYEB//EADoQAAIBAgQFAQYFAgQHAAAAAAABAgMRBAUhMQYSQVFhcRMiMoGRoUJSscHR4fAHM4LxFBU0U2Jykv/EABgBAAMBAQAAAAAAAAAAAAAAAAABAgME/8QAIhEBAQEBAAIDAQACAwAAAAAAAAECEQMhEjFBUTJhBBMU/9oADAMBAAIRAxEAPwBIIEOMG4oKEgoAIUCw4YJBEIANw3GhQEdccmNt8iGeKjF20bF0+OoKZWVc2jDV2/8Aohjn9N/iXotQ6F1cdcqJ5tZXt9n+gyPENNW52r3/AAyv9U9UMl3cXMcuHx1Op8E03a9r66+Ce4wkUhykQpjkwCZSJEyCLJIsAkQ9DIj0AFDgIcBCgoCQ5IAQgiAMshyEgolRIchISACEARgRCSC0ACxLDQilFdd+xVZnncKUWvinto9F8/4Jt76g5x14mvZ6tLy3Yra81L4X81v8upmKmZ1Kjdmo382tfq29zspYZtJznJ+IXj67q4/jz7HeujE4aGrm36czb+SKnEckdotK/VtMbia6g7QSVt38T9b33KuviuZ3ab9ZfqVmVNsW9PMpqKV7xXeN/uPli6T1ad/kkvOmrZVPFOokvdjbx08Ldvyc01Z7plcTdLylmSjLminfZeFsi7wWfTVnJ3Xbt21MRCpY6oYlhclNPUcJmMKiunr27HcjzOhiW42Wmu9zX5BmKmuRttqy1et7a28E8X1fofFjUhyA0sSREUSSIBIh6GIegIQoSCgBCEIAy49AHIlRBAOQwQ6KACpJqLa3AHvQgxeYU6Md1KT2Xnt/UqMdnMYrlle/byu5lsZjpylzX9A5aLeNLjM0kk38cnrZSSS7Lz8kZfHSqTfvat6WS0Xp1Y7AYWrWb5L3d7ytrb57Gjy/hepLdWXXz6k61nJ5xrbI0qbg+aTaaellzNefUNfMalrRWmv4pN+rZ6XQ4Uhs4pklThWmlpFfNGf/AHz+Nf8Az3+vHpznLZW+ViNRfVX9T1atwzT/ACIrMVw3DVJL0t+jLnnyjX/G1/WEpSt0j9f4FWWmrh8ty6xmUOm3ZP5WucLwrlo56bXta3qjWal9xjcWeqqrk9N3Iq9CUJODeqbT/kMJaXLQ74zen76FpgcU6clOLV00+33KGLbOzD1pJJdPKQrDj0/IsxVeG1pLctlEwPDOZqlOz+F6adzfUpKSutibFw5D4DbDoiNJEehkSRARyEJBAEIIgDMIIkGxKiHIA5DBDkNEwCozjB06ienvKy0Vm32v2KbLcilUqxp22d2anFwVOPN1t26t3l9kdvBtNVJyqP5fMz1qyLzmWrfK8hhTily/YtaeCjEtI00MnCxlcfraeT8jj9kkRTS38HTMZKOhFjWVUYmCXQqcTH+7F5ioFZWh4M79tGexmDUldozmPwSi9tXrF2672fhmzxKt09TP5kmk3ve9jbGrGHkzLGFzBOcubrtvt4v1RyRTXk6MXBxlden8nHKWrO3P04NT2kho7kqldkVPUeUl34ao00en8O4pVKUbX00d3d6HlVKRv+CKt4uN/NidKy1tgpC5RyRKzkPQ1IegIUECHIAQgiAMwhyAhyEohyEgoAQ1sehri+gCObO5Xpu3RXXqXXAFBqipd9TN51XVOOu3wvw3t90bLJsXDCYam2k5OCaXyu2zHU7xrm87WvhT0IKrSMNnH+I3sVpCPo5bAyrjOnjFouWa3i3913Q92Sek4nb7rWVqiQyVdJWKqeK5kV2JzHkjJsw665mcWOLxcVu1puZ/HcR0ad9bu7t/BkeIeIppWhKzaexjlias3vf11NceHs7WPk81l5lvMfxpBaRhd+djlpcU0K0XCceT9vTujN4LAJO8yyq4WjNWsk+6LucT0iXyX30cbgYyd4tSi9YtdSjrYGUG9C8y/CyptxvzQf28ljKgu1y5r4oufkw1nF2/clg/0LTPcDyNTjs9H4ZVI1l7GGpy8dFF7Gx4Iqv2jXR628mMps1fBdnWSfbRr9BU8/b0pINgqI6xKzUOQrBAChyGocgIRBEAZhDkBDkhKGwUgoQAhLcKQGgCh4pptwVusl9dkXFTL6teKlOXJCMUo95JJJW7LT7lbxMn7C66O/0dzVUb1KdBLadOD+sUYbtz9NvFma+3luc5BJTbjKUvCjffvYgyrnoTTlzRafVNfJm7z/ibCYVyowh7WcdHaXLTg+jb69u90eeY7Pp1ZfDBJNK8dvk2h5m9Tl+jt8eb/t7BkK9sk73ul1Kzi7DzhCVtlqL/AAvxMqy+CUVHR3+GT7wfbuXHGMVKEov0Mrm5+/62zfleT+PDq9Tnnq/Q0uU5dRpxU60oQV1rPz2iUrwM6c1Jcqd2k5apPo34L3KcujFynWcK0mtH7Rpxv+VNWX9Dotln255LLfXs/Ms0wMfcUpXS/wC3yr7opHXpv3oTXlPQfiMhpx5pzqSbv1f77s4KeAUpKMLyd+mw5nM+qVu79xe4WotGpJ37O5bUrSOfA5ZGnFKcUmdSgovQz+UX8bztcGdYa9OS9H9zGqNtPJvsVacJLumYbEQd2vJtisPJPYRNbwM17azXTe2z8mSipX5bG74KwXs6im5LWNnHr4ZeqzzLW/SDYeogkiVmiQhABQ9DUOQEIhCAM0h6GpDkJQoKAh6AEBjgMA48fTU4Si1fRl1g8LOrgqMYS5W6cYc1k3FLR6PwV0lfQ1vDtJrD04W/D++5l5M9aePXOvOMdw9RpRlBzbTd589m5fO25X4DJ6c58lCipa6y5XyR8tvd+EewV+HaVR80oRb8olhgqVFXtFJeEiLN/v01m/H+Ttc3DGXexhrq7avT5adDPcUSu5LybeErQcrWujzfimreT16huczIfhtutaZTEwjfWxcZVgKdWKUrNff0uVkcq9vpz8iXi5NklWeGqeznLmV/dfdXFqevVVL79tBT4Mw03dwv/qLbD8NUaa92KXojty/ExkjoxGISTI/PdXz36ZTMcvgntsUuJoKOqNFmWLXf7mbxda7KxEb45JaX9DM06PNXjHvNfS5rYw5o7FQ8qqQxEZ2vC7kmummzOjNcm53iPF4WNLmqtczbXKuibIYYipBrEwupKVpdtdvkHiCs7RSf42n4tHb73Fldd1Pckrpqz/Yf51cer5XilWpQqfmim/W2v3OiTKLg+pehy/lk0XjHPcZ6nKaIQhkch6GIegIRCEAZtDkJCEYodYCHIDFIEhyGyAGSN7w5G2Hg/wDx/cwUjYYXGezoQS6Qj+gtamfdEzdeotMfj4wW5lKOcrE14wWsYv3vNv8AYy3GPEbjeMWdnA1Bwh7Sb1lq/F9jn1rWr12Y8ecTn60WL4qo1ZTw9Oa9pBNuNmnZb2727HnHEGZNylKbtGP37epuM1x0IuVTlTa0+HXTyjzziLE08VdwfLrqraepWZ3Xai6mc8z6Uaz+UX7sXbu5Wf0R2Zfm/PWg2mkt/LZULAtatdSwwUFFp8ptrOeemGda77b6nmNSGsE2uq7nTDPI1Fa9pdYtWaflGVjmritLfwczxftJKd0pLZrfTXXujH/rdF8sXWPxbbscy95EGIvKEKnSSu/XqdFJWQ8xG9ddNBaWOiekW+yf2IaWwMyrezpTl+WEn9jRmxmPq80o0/8AW31cpX/RaFhl0LSSW/8ABzZbS9pKGvven19PUuo4epiKnLFKMb8rsrN+r7aDpytdwfSccOm/xSci8ZFhKCpwhTX4YpEjKjO3tAQhICOQ9DEPQEcIQgDOIIEOsIxQ5AQ5ABA0FCaA0bRYqtejb8qcfpscVibDq8Zx8XI8s7lp4rzTzHM4yq4nkfe/0N7w9N2UIv8A9ttO/wAvJWY7J05OpHR63druzKOjHGpyp0pL3lZX3Xi5lLNSc/GuuzV/23WJlhI3jKXO9mov66lJiMRllJNLD3bte87rTqzLZXgsXSxCdelVqR1UlFc78WRtKuX4WrFyeEqwk4pq8Nb9YtKVrlWfH9Od1+MtmOb0Zv3KcYrokVNTMI32S02NHLK58so08JUvd8sp8sY+Hu39ihx3DtSOtapHm/LFd99bIvPP1Osa/itxOYws0r38IGVc05aaImpZRBS/M+1y4oYSMNUvhV9v1K1qScjCZ1b2rTEpQo06fW1/rqxsJ6Jf3uV+IxDnJeESwnYjM9L1fazpzOnEUlUg1LWLVnpumVtGd2i1n/lt+n6lFFHleXOnW9hCcedpPZ/A9pabG/y/LaeHVorW7bbWupn8gwyli5VH0w8EvnJ3/RGskypE2/ZXAK4rlJISEhAD0PQyI9CI4QhAGdQRJBEYocBDkAIQkgpAYWJKU+R36bNd090NsGwCVHUaV+qexFk2HTrJyjb01v8AwT1Kd1b5oZgp8s1Lqn9vBy6z8bx1Z18s9bGHJBKTitOtkVuP4oowfK6kPnFpnfKnzRVldNfqjC59wvKrKTjCTb6xVi5qz0OT7+0WfcZ05JxjU6fgj+5iMTm/O3Zb992dc+CcXGTcoqy/NUX7HRT4clf3rL01H3M/R3epznHHl6cnex241KMS2w+Wxpq7+WxQZrXu7J362DN+VRqfGI4R6j4O4pbL0Q6hBmrH7dWF3/Qt8TO1O3V2+xWUWoixOL5tOwlNPw2r80rfgivo5fyXrZQcKzvGS9C+ZU+ka+yYLgbG3KJIFDEOTAJESIjiSIRCIQgDPoIkERigiQUAJDrCQbDBCDYQAERyhZ+uz7EqDa+jJ1n5RWdfFeZTmEeTlk7uKs9un+w/GZnCMbr7NfuZTGwqUV7WGsfx6XcbbSa6xtv8jNZjn/PHSW/RPTb+hjy/TWWT20mJzenOTTfjt9bFZjsypwfuu+9rMw9XM3ro/wCpx18XUn/f2HPEL5l/mufOatG99lt9yko1XOSvrqQUMLKb3+32L3CZcoay0t0/vyayZzGVutV1U4Xtfol+mwatS2iBOpbRaIrMZieW4vtX0nq4prqRQrNuxUzxDZPhZ3enzHxPXofCVX33HvF/VM1TRheGKvJOD82/Y3kh5LSOSGpEjGFEKHIYPQA+LJEyFMkTESS4htxAFGgiQRGKCgIcgBIcgIcMCAchADbDkgDkwN14OKcZRf8AfQyWd8LUJSc1Dl1u+TS/qtjXZe/ea8DsXT77HN5Lc67HTjM1nleZT4ZpQ155yXS7X6pEH/LKMPw39W3c308vjK6WzMvm2WVKbdug8+S39K+OT8VDnGGkUl6Kxz1cX5ODGzqRdmcHtH1ZrJ1lbxcyr6XKfGV7sn9r7tl9SumtS8xGqUW2d2D3OKCuywwySHostPlM7NM9Fw9ZVIKS67+vY8xy+prc2GS5goT9nJ+7PbxL+pEvtdnpomMY9jblIIQGwXAHpjkyJMcmMJbiI+YIiVaEFBEZIcBDhgkOQkEAKExCYA1gCxlwN2YCXvr0Z31Y3KrCS9+JZSnY5vN9urw/SKMI37HHmlKMjpq1UcGIq8ytq/XUxla2MVnOXat2MtjMJys9Fx9HnV0Y/M6NpG+NMfJmX2pVCyOecNSwqWRyuF9WbSue5RQXY6KY3kJYRC0SLLBTsWs6mifYoqM7HbKtoTVtPl/EjhaNT3o9/wAS/lF/gszpVvglf5HmlCFStNQgm23/AHfwbfK8HHDQ5b67zl3f8FS1FkX7Y1s4Kdee/wBieFe+6sPsLifmHKRHzCUhkluIjuAA50ESHIQJBQkFDAoIUIAQmIDYA2TImx8mNhTlNqMU23okgB+Gfvx9TvqSLOnl3sKPvRXPL4no7LflRTYpHN5vt1eD6Q15vYrZ1bSJ6sysqzadzBulxuIstVcyWZVk29DU1GqkdimxeEi7mmbxnqMpO7FCBaYjDpEf/DO17G3yY/FXyQ6ESVUJSdkm+2m/oX2XcLYidpTjyR/NOy+i3Y+lxQRi1qWmAyeviLO3JC+s5XS+S3Zr8HkFGjZ8vPL81TSC8qJ1tub9332tL7Qj6dwlTb/HFgcFTw0LQW+8n8U347I6o05S1ei6R/d+Tqo4Np80neXft4XY6VQGTjjAKgdqoglSGHPGBLqtyWECX2V0Bccun9sB1ewQg6OK9DkIRaTkFCEAEIhAABIQgCKRa8Nf53+liEBX6aTNfg+ZksWIRzef/J1f8f8AxVMysxe/zEIwjcaGxyYrcQi4WlLidyen8IhGn4yv2uOEP+oXo/0NdifjXqIRUZ6+3DnW3zOzDfDH0QhDiE6DEQigMQSEIAESWIhABEIQB//Z" alt="" />
            </div>
          </div>
          <div>
            <h3 className='font-bold text-lg cursor-pointer'>{post.user_id.fullName}</h3>
            <h5 className='text-sm cursor-pointer'>@ {post.user_id.userName}</h5>
          </div>
        </div>
        <div className="flex gap-3">
          <div onClick={() => { toggleLike(post._id) }} className="cursor-pointer flex gap-1">
            {liked ? (
              <svg className="h-6 w-6 text-content" width="15" height="15" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7" />
              </svg>
            ) : (
              <motion.svg initial={{ scale: '0%' }}
                animate={{ scale: '100%' }}
                exit={{ scale: '120%' }} className="h-6 w-6 text-content" xmlns="http://www.w3.org/2000/svg" fill="#FF0000" viewBox="0 0 24 24"><path d="M14 20.408c-.492.308-.903.546-1.192.709-.153.086-.308.17-.463.252h-.002a.75.75 0 01-.686 0 16.709 16.709 0 01-.465-.252 31.147 31.147 0 01-4.803-3.34C3.8 15.572 1 12.331 1 8.513 1 5.052 3.829 2.5 6.736 2.5 9.03 2.5 10.881 3.726 12 5.605 13.12 3.726 14.97 2.5 17.264 2.5 20.17 2.5 23 5.052 23 8.514c0 3.818-2.801 7.06-5.389 9.262A31.146 31.146 0 0114 20.408z" /></motion.svg>
            )} <span>{post.Likes.length}</span>
          </div>
          <div onClick={() => {
            console.log(post._id, "posting post id")
            openComment(post._id)
          }} className="cursor-pointer">
            <svg className="h-6 w-6 text-content" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

PostE.propTypes = {
  post: PropTypes.shape({
    user_id: PropTypes.shape({
      UserName: PropTypes.string.isRequired, // Adjust the prop type accordingly
    }),
    PostContent: PropTypes.string.isRequired,
    Likes: PropTypes.array.isRequired,
    _id: PropTypes.string.isRequired,
    Image_Video_url: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    // Add other properties of the post object as needed
  }).isRequired,
  liked: PropTypes.bool.isRequired,
  saved: PropTypes.bool.isRequired,
  toggleLike: PropTypes.func.isRequired,
  toggleSave: PropTypes.func.isRequired,
  openComment: PropTypes.func.isRequired,
};

export default PostE