import { Priority, Status } from "@/app/generated/prisma/browser";
import { prisma } from "@/lib/prisma/prisma";

async function main() {
  // 既存データを削除
  await prisma.todo.deleteMany({});
  await prisma.memo.deleteMany({});
  await prisma.checklist.deleteMany({});
  await prisma.user.deleteMany({});

  // user
  const user = await prisma.user.create({
    data: {
      id: "dammy-user-id",
      email: "dammy.email@gmail.com",
      name: "Dammy User",
    },
  });

  // Todoデータの配列
  const todosData = [
    // パターン1: startDateのみ、summary無し、checklist 3つ
    {
      title: "プロジェクト企画書作成",
      completed: false,
      status: Status.IN_PROGRESS,
      startDate: new Date("2024-01-15"),
      endDate: null,
      priority: Priority.HIGH,
      summary: null,
      userId: user.id,
      checklists: [
        { title: "市場調査を行う", completed: true },
        { title: "競合分析をまとめる", completed: false },
        { title: "予算計画を立てる", completed: false },
      ],
      memos: [],
    },
    // パターン2: endDateのみ、summary有り、memo 2つ
    {
      title: "UI/UXデザインレビュー",
      completed: false,
      status: Status.TODO,
      startDate: null,
      endDate: new Date("2024-02-28"),
      priority: Priority.MEDIUM,
      summary: "デザインの最終確認と修正",
      userId: user.id,
      checklists: [],
      memos: [
        { content: "カラーパレットの統一性を確認" },
        { content: "アクセシビリティ基準を満たすか検証" },
      ],
    },
    // パターン3: startDate & endDate両方、checklist 1つ、memo 1つ
    {
      title: "データベース設計",
      completed: true,
      status: Status.DONE,
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-01-10"),
      priority: Priority.HIGH,
      summary: "ERD作成とスキーマ定義完了",
      userId: user.id,
      checklists: [{ title: "テーブル設計書を作成", completed: true }],
      memos: [{ content: "インデックス設計も含めて完了" }],
    },
    // パターン4: 日付なし、summary無し、checklist 2つ
    {
      title: "コードレビュー対応",
      completed: false,
      status: Status.TODO,
      startDate: null,
      endDate: null,
      priority: Priority.LOW,
      summary: null,
      userId: user.id,
      checklists: [
        { title: "指摘事項を確認する", completed: false },
        { title: "リファクタリングを実施", completed: false },
      ],
      memos: [],
    },
    // パターン5: startDateのみ、summary有り、memo 3つ
    {
      title: "API実装",
      completed: false,
      status: Status.IN_PROGRESS,
      startDate: new Date("2024-01-20"),
      endDate: null,
      priority: Priority.EMERGENCY,
      summary: "RESTful APIエンドポイント実装",
      userId: user.id,
      checklists: [],
      memos: [
        { content: "エラーハンドリングを統一する" },
        { content: "バリデーションロジックを追加" },
        { content: "レスポンス形式をドキュメント化" },
      ],
    },
    // パターン6: 完了済み、日付両方、checklist & memo両方
    {
      title: "セキュリティ監査",
      completed: true,
      status: Status.DONE,
      startDate: new Date("2023-12-01"),
      endDate: new Date("2023-12-15"),
      priority: Priority.EMERGENCY,
      summary: "脆弱性スキャンと対策完了",
      userId: user.id,
      checklists: [
        { title: "ライブラリの脆弱性チェック", completed: true },
        { title: "SQLインジェクション対策確認", completed: true },
      ],
      memos: [
        { content: "重大な問題は発見されず" },
        { content: "次回は3ヶ月後に実施予定" },
      ],
    },
    // パターン7: 保留中、endDateのみ
    {
      title: "パフォーマンス最適化",
      completed: false,
      status: Status.ON_HOLD,
      startDate: null,
      endDate: new Date("2024-03-31"),
      priority: Priority.MEDIUM,
      summary: null,
      userId: user.id,
      checklists: [{ title: "ボトルネックを特定", completed: true }],
      memos: [{ content: "他のタスク優先のため一時保留" }],
    },
    // パターン8: 日付なし、summary有り、データなし
    {
      title: "ドキュメント更新",
      completed: false,
      status: Status.TODO,
      startDate: null,
      endDate: null,
      priority: Priority.LOW,
      summary: "README とAPI仕様書を更新",
      userId: user.id,
      checklists: [],
      memos: [],
    },
  ];

  // for ofループでTodoデータを作成
  for (const todoData of todosData) {
    await prisma.todo.create({
      data: {
        title: todoData.title,
        completed: todoData.completed,
        status: todoData.status,
        startDate: todoData.startDate,
        endDate: todoData.endDate,
        priority: todoData.priority,
        summary: todoData.summary,
        userId: todoData.userId,
        checklists: {
          create: todoData.checklists,
        },
        memos: {
          create: todoData.memos,
        },
      },
    });
  }

  console.log("Seeding database...");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
