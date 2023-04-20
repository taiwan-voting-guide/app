const hintMap: Array<{ category: string; items: Array<string> }> = [
  {
    category: "個人基本資料",
    items: [
      "性別",
      "生日",
      "出生地",
      "家庭背景",
      "宗教信仰",
      "婚姻狀況",
      "子女人數",
    ],
  },
  {
    category: "教育與經歷",
    items: ["學歷", "經歷", "軍事服役經歷", "國際交流經歷"],
  },
  { category: "競選相關", items: ["政見", "競選策略", "競選經費來源"] },
  { category: "政治背景", items: ["政黨", "過去政績", "政治風格", "政治爭議"] },
  { category: "負面資訊", items: ["犯罪記錄", "貪污舞弊", "與不良團體關聯"] },
];

const hints = hintMap.reduce<Array<string>>(
  (acc, cur) => [...acc, ...cur.items],
  []
);

export { hints, hintMap };
