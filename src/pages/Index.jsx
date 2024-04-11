import { useState } from "react";
import { Box, Heading, Text, Button, Input, Stack, Image, Select, useToast } from "@chakra-ui/react";
import { FaCheck, FaUserCircle } from "react-icons/fa";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("customer");
  const [selectedManager, setSelectedManager] = useState("");
  const toast = useToast();

  const handleLogin = () => {
    // 실제로는 서버에 인증 요청을 보내야 함
    if (username === "admin" && password === "admin") {
      setIsLoggedIn(true);
      toast({
        title: "로그인 성공",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "로그인 실패",
        description: "아이디와 비밀번호를 확인해주세요.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setUserType("customer");
  };

  const handleAssign = () => {
    toast({
      title: `${selectedManager} 매니저가 배정되었습니다.`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={8}>
      <Heading as="h1" size="2xl" mb={8}>
        청소 서비스 예약 시스템
      </Heading>
      {isLoggedIn ? (
        userType === "admin" ? (
          <Box>
            <Heading size="lg" mb={4}>
              관리자 대시보드
            </Heading>
            <Stack direction="row" mb={4}>
              <Select placeholder="청소 매니저 선택" value={selectedManager} onChange={(e) => setSelectedManager(e.target.value)}>
                <option value="김철수">김철수</option>
                <option value="이영희">이영희</option>
                <option value="박민수">박민수</option>
              </Select>
              <Button onClick={handleAssign}>배정하기</Button>
            </Stack>
            <Button onClick={handleLogout}>로그아웃</Button>
          </Box>
        ) : (
          <Box>
            <Stack direction="row" mb={8} align="center">
              <FaUserCircle size={24} />
              <Text fontSize="xl" fontWeight="bold">
                {username} 님 환영합니다!
              </Text>
            </Stack>
            <Image src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMGhvdXNlfGVufDB8fHx8MTcxMjgyNDY5N3ww&ixlib=rb-4.0.3&q=80&w=1080" alt="clean house" mb={8} />
            <Text fontSize="lg" mb={4}>
              청소 서비스 예약이 완료되었습니다.
            </Text>
            <Button leftIcon={<FaCheck />} colorScheme="green" onClick={handleLogout}>
              확인
            </Button>
          </Box>
        )
      ) : (
        <Box>
          <Stack spacing={4} mb={8}>
            <Input placeholder="아이디" value={username} onChange={(e) => setUsername(e.target.value)} />
            <Input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Select value={userType} onChange={(e) => setUserType(e.target.value)}>
              <option value="customer">고객</option>
              <option value="admin">관리자</option>
            </Select>
          </Stack>
          <Button onClick={handleLogin}>로그인</Button>
        </Box>
      )}
    </Box>
  );
};

export default Index;
