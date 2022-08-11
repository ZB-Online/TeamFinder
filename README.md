# TeamFinder


## Preview

<img src="https://user-images.githubusercontent.com/62092665/184060534-1c46c894-bb49-4ad9-80b7-3d687c41c36d.png" alt="demo screenshot" style="width: 600px" />


<details>
<summary>글 작성하기</summary>
<img src="https://user-images.githubusercontent.com/62092665/184060550-6f3c9050-fe82-4c2e-adc1-d0aefa3bbdf9.png" alt="demo screenshot" style="width: 600px" />
</details>

<details>
<summary>내 정보 수정</summary>
<img src="https://user-images.githubusercontent.com/62092665/184060647-7160406d-3442-4a62-a37d-832c037f6130.png" alt="demo screenshot" style="width: 600px" />
</details>



## API

### GET /api/postings

포스팅 정보 전부 취득

### POST /api/postings

포스팅 추가

**Payload**

```json
{
  "title": "축구 같이 할 사람",
  "city": ["경기도"],
  "sportsType": ["축구"],
  "content": "14:00에 축구 같이 할 사람 연락주세요.",
  "date": "2021-12-13"
}
```

### PATCH /api/postings/:id

특정 포스팅 수정

**Payload**

```json
{
  "title": "축구 같이 할 사람",
  "city": ["서울", "경기도"],
  "sportsType": ["축구"],
  "content": "서울 지역도 같이 구함!",
  "recruit": true
}
```

### DELETE /api/postings/:id

특정 포스팅 삭제

### POST /signin

로그인

**Payload**

```json
{
  "id": "",
  "password": ""
}
```

### POST /signup

회원가입

**Payload**

```json
{
  "id": "",
  "password": ""
}
```
