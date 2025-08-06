"use client";
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react';

const Update = ()=>{
  const router = useRouter()
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const params = useParams();
  const id = params.id;

  useEffect(()=>{
    fetch(`${process.env.NEXT_PUBLIC_API_URL}topics/${id}`)
    .then(r=>r.json())
    .then(r=>{
      setTitle(r.title);
      setMessage(r.message);
    });
  },[id]);

  return (
    <>
      <form onSubmit={(e)=>{
        e.preventDefault();
        //const title = e.target.title.value;
        //const message = e.target.message.value;
        const options = { //전송 방식, 전송할 데이터 설정
          method:'PATCH',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({title, message})
        }
        fetch(process.env.NEXT_PUBLIC_API_URL+'topics/'+id, options) //두번째 인자에는 추가할 값
        .then(r=>r.json())
        .then(result=>{
          router.push(`/read/${result.id}`);
        });
      }}>
        <div className="mb-3">
          <input type="text" className="form-control" name="title" value={title} placeholder="title" onChange={(e)=>{setTitle(e.target.value)}}/>
        </div>
        <div className="mb-3">          
          <textarea className="form-control" name="message" value={message} onChange={(e)=>{setMessage(e.target.value)}} rows="3"></textarea>
        </div>
        <p>
          <button type="submit" className="btn btn-success">수정</button>
        </p>
      </form>
    </>
  )
}

export default Update;