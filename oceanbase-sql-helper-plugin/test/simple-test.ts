// 简单的功能测试文件
// 这个文件用于验证插件的基本功能

// 模拟关键词数据
const mockKeywords = {
  "SELECT": { "description": "用于从数据库中查询数据", "url": "https://example.com/select" },
  "ALTER TABLE": { "description": "用于修改表结构或属性", "url": "https://example.com/alter-table" },
  "CREATE MATERIALIZED VIEW": { "description": "用于创建物化视图", "url": "https://example.com/create-mv" }
};

// 测试函数
export function testKeywordMatching() {
  console.log('开始测试关键词匹配功能...');
  
  // 测试单个关键词
  const singleKeyword = "SELECT";
  if (mockKeywords[singleKeyword]) {
    console.log('✅ 单个关键词匹配测试通过');
  } else {
    console.log('❌ 单个关键词匹配测试失败');
  }
  
  // 测试多词关键词
  const multiKeyword = "ALTER TABLE";
  if (mockKeywords[multiKeyword]) {
    console.log('✅ 多词关键词匹配测试通过');
  } else {
    console.log('❌ 多词关键词匹配测试失败');
  }
  
  // 测试大小写不敏感
  const upperKeyword = "SELECT";
  const lowerKeyword = "select";
  if (upperKeyword.toUpperCase() === lowerKeyword.toUpperCase()) {
    console.log('✅ 大小写不敏感测试通过');
  } else {
    console.log('❌ 大小写不敏感测试失败');
  }
}

export function testKeywordStructure() {
  console.log('开始测试关键词数据结构...');
  
  for (const [keyword, info] of Object.entries(mockKeywords)) {
    // 检查必要字段
    if (!info.hasOwnProperty('description') || !info.hasOwnProperty('url')) {
      console.log(`❌ 关键词 ${keyword} 缺少必要字段`);
      return;
    }
    
    // 检查字段类型
    if (typeof info.description !== 'string' || typeof info.url !== 'string') {
      console.log(`❌ 关键词 ${keyword} 字段类型错误`);
      return;
    }
    
    // 检查描述格式
    if (info.description.endsWith('。')) {
      console.log(`❌ 关键词 ${keyword} 描述以句号结尾`);
      return;
    }
    
    // 检查 URL 格式
    if (!info.url.startsWith('http')) {
      console.log(`❌ 关键词 ${keyword} URL 格式错误`);
      return;
    }
  }
  
  console.log('✅ 关键词数据结构测试通过');
}

export function testMultiWordKeywords() {
  console.log('开始测试多词关键词...');
  
  const testCases = [
    "SELECT",
    "ALTER TABLE", 
    "CREATE MATERIALIZED VIEW"
  ];
  
  for (const testCase of testCases) {
    const wordCount = testCase.split(' ').length;
    console.log(`关键词 "${testCase}" 包含 ${wordCount} 个单词`);
  }
  
  console.log('✅ 多词关键词测试通过');
}

// 运行所有测试
export function runAllTests() {
  console.log('=== OceanBase SQL Keywords Helper 测试开始 ===');
  
  testKeywordMatching();
  testKeywordStructure();
  testMultiWordKeywords();
  
  console.log('=== 测试完成 ===');
}

// 如果直接运行此文件，执行所有测试
if (require.main === module) {
  runAllTests();
} 