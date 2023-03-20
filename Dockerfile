FROM registry.wisebitcoin.pro/bhpc/images/nodejs:18.13.0

# 디렉토리 지정
WORKDIR /usr/src/app

# .gitlab-ci.yml 에서 받아온 ARG 변수 받는 방법.
#ARG TEST
#RUN echo $TEST

# 의존성 설치를 위해 package.json, package.lock 복사
COPY package.json ./
COPY package-lock.json ./

# 의존성 설치
RUN npm ci

# 필요한 모든 파일을 복사
COPY . .

# 앱 빌드
RUN npm run build

# 컨테이너 포트 80 설정
EXPOSE 80/tcp
EXPOSE 443/tcp

# 애플리케이션 실행
CMD [ "npm", "run", "start" ]