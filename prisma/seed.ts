import { Priority, Status } from "@/app/generated/prisma/browser";
import { prisma } from "@/lib/prisma/prisma";

async function main() {
  // 既存データを削除
  await prisma.checklist.deleteMany();
  await prisma.memo.deleteMany();
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  // user
  const user = await prisma.user.create({
    data: {
      id: "dammy-user-id",
      email: "dammy.email@gmail.com",
      name: "Dammy User",
    },
  });

// ...existing code...
// Todoデータの配列
const todosData = [
  // 9月のデータ (10件)
  {
    title: "新規プロジェクトの企画書作成",
    completed: false,
    status: Status.IN_PROGRESS,
    startDate: new Date("2025-09-01"),
    endDate: new Date("2025-09-10"),
    priority: Priority.HIGH,
    summary: "新規事業の立ち上げに向けた企画書を作成する",
    userId: user.id,
    checklists: [
      { title: "市場調査を行う", completed: true },
      { title: "競合分析をまとめる", completed: true },
      { title: "予算計画を立てる", completed: false },
    ],
    memos: [
      { content: "ターゲット層は20-30代", createdAt: new Date("2025-09-02") },
    ],
  },
  {
    title: "クライアントミーティング準備",
    completed: true,
    status: Status.DONE,
    startDate: new Date("2025-09-03"),
    endDate: new Date("2025-09-05"),
    priority: Priority.MEDIUM,
    summary: "次回のクライアントミーティングの資料準備",
    userId: user.id,
    checklists: [
      { title: "プレゼン資料作成", completed: true },
      { title: "デモ環境準備", completed: true },
    ],
    memos: [],
  },
  {
    title: "データベース設計",
    completed: false,
    status: Status.TODO,
    startDate: new Date("2025-09-05"),
    endDate: null,
    priority: Priority.HIGH,
    summary: null,
    userId: user.id,
    checklists: [
      { title: "ER図作成", completed: false },
      { title: "テーブル定義", completed: false },
      { title: "インデックス設計", completed: false },
    ],
    memos: [
      { content: "PostgreSQL使用予定", createdAt: new Date("2025-09-05") },
      { content: "スケーラビリティを考慮", createdAt: new Date("2025-09-06") },
    ],
  },
  {
    title: "UI/UXデザインレビュー",
    completed: false,
    status: Status.IN_PROGRESS,
    startDate: new Date("2025-09-08"),
    endDate: new Date("2025-09-12"),
    priority: Priority.MEDIUM,
    summary: "新機能のデザインレビューとフィードバック",
    userId: user.id,
    checklists: [
      { title: "デザイン案確認", completed: true },
      { title: "ユーザビリティテスト", completed: false },
    ],
    memos: [
      { content: "カラーパレット要調整", createdAt: new Date("2025-09-09") },
    ],
  },
  {
    title: "セキュリティ監査",
    completed: false,
    status: Status.TODO,
    startDate: null,
    endDate: new Date("2025-09-20"),
    priority: Priority.EMERGENCY,
    summary: "システム全体のセキュリティチェック",
    userId: user.id,
    checklists: [
      { title: "脆弱性スキャン", completed: false },
      { title: "認証システム確認", completed: false },
      { title: "ログ監視設定", completed: false },
    ],
    memos: [],
  },
  {
    title: "API仕様書更新",
    completed: true,
    status: Status.DONE,
    startDate: new Date("2025-09-10"),
    endDate: new Date("2025-09-15"),
    priority: Priority.LOW,
    summary: null,
    userId: user.id,
    checklists: [
      { title: "エンドポイント一覧更新", completed: true },
      { title: "レスポンス例追加", completed: true },
    ],
    memos: [],
  },
  {
    title: "新人研修カリキュラム作成",
    completed: false,
    status: Status.IN_PROGRESS,
    startDate: new Date("2025-09-12"),
    endDate: new Date("2025-09-25"),
    priority: Priority.MEDIUM,
    summary: "新入社員向けの研修プログラムを整備",
    userId: user.id,
    checklists: [
      { title: "研修スケジュール作成", completed: true },
      { title: "教材準備", completed: false },
      { title: "講師アサイン", completed: false },
    ],
    memos: [
      { content: "実務に即した内容を重視", createdAt: new Date("2025-09-13") },
    ],
  },
  {
    title: "サーバーメンテナンス",
    completed: false,
    status: Status.TODO,
    startDate: new Date("2025-09-18"),
    endDate: new Date("2025-09-18"),
    priority: Priority.HIGH,
    summary: "定期メンテナンスとアップデート",
    userId: user.id,
    checklists: [
      { title: "バックアップ取得", completed: false },
      { title: "OSアップデート", completed: false },
    ],
    memos: [
      { content: "深夜2時開始予定", createdAt: new Date("2025-09-17") },
    ],
  },
  {
    title: "マーケティング戦略立案",
    completed: false,
    status: Status.TODO,
    startDate: new Date("2025-09-20"),
    endDate: new Date("2025-09-30"),
    priority: Priority.MEDIUM,
    summary: "Q4のマーケティング施策を検討",
    userId: user.id,
    checklists: [
      { title: "市場分析", completed: false },
      { title: "ターゲット選定", completed: false },
      { title: "予算配分", completed: false },
      { title: "KPI設定", completed: false },
    ],
    memos: [],
  },
  {
    title: "コードレビュー",
    completed: true,
    status: Status.DONE,
    startDate: new Date("2025-09-22"),
    endDate: new Date("2025-09-23"),
    priority: Priority.LOW,
    summary: null,
    userId: user.id,
    checklists: [
      { title: "PR #123 確認", completed: true },
      { title: "PR #124 確認", completed: true },
    ],
    memos: [],
  },

  // 10月のデータ (10件)
  {
    title: "パフォーマンス最適化",
    completed: false,
    status: Status.IN_PROGRESS,
    startDate: new Date("2025-10-01"),
    endDate: new Date("2025-10-15"),
    priority: Priority.HIGH,
    summary: "アプリケーションの速度改善",
    userId: user.id,
    checklists: [
      { title: "ボトルネック特定", completed: true },
      { title: "クエリ最適化", completed: true },
      { title: "キャッシュ実装", completed: false },
      { title: "負荷テスト", completed: false },
    ],
    memos: [
      { content: "レスポンス時間を50%削減目標", createdAt: new Date("2025-10-02") },
    ],
  },
  {
    title: "モバイルアプリ開発",
    completed: false,
    status: Status.TODO,
    startDate: new Date("2025-10-05"),
    endDate: new Date("2025-10-31"),
    priority: Priority.EMERGENCY,
    summary: "iOS/Android対応のネイティブアプリ開発",
    userId: user.id,
    checklists: [
      { title: "要件定義", completed: false },
      { title: "画面設計", completed: false },
      { title: "開発環境構築", completed: false },
    ],
    memos: [
      { content: "React Nativeを使用", createdAt: new Date("2025-10-05") },
      { content: "11月リリース予定", createdAt: new Date("2025-10-06") },
    ],
  },
  {
    title: "社内勉強会開催",
    completed: true,
    status: Status.DONE,
    startDate: new Date("2025-10-07"),
    endDate: new Date("2025-10-07"),
    priority: Priority.LOW,
    summary: null,
    userId: user.id,
    checklists: [
      { title: "テーマ選定", completed: true },
      { title: "資料作成", completed: true },
      { title: "会場予約", completed: true },
    ],
    memos: [],
  },
  {
    title: "顧客サポートシステム改善",
    completed: false,
    status: Status.IN_PROGRESS,
    startDate: new Date("2025-10-10"),
    endDate: new Date("2025-10-25"),
    priority: Priority.MEDIUM,
    summary: "問い合わせ対応の効率化",
    userId: user.id,
    checklists: [
      { title: "現状分析", completed: true },
      { title: "ツール選定", completed: false },
      { title: "導入テスト", completed: false },
    ],
    memos: [
      { content: "チャットボット導入検討", createdAt: new Date("2025-10-11") },
    ],
  },
  {
    title: "決算資料作成",
    completed: false,
    status: Status.TODO,
    startDate: null,
    endDate: new Date("2025-10-31"),
    priority: Priority.HIGH,
    summary: "上半期の決算報告書を準備",
    userId: user.id,
    checklists: [
      { title: "データ収集", completed: false },
      { title: "財務諸表作成", completed: false },
      { title: "経営陣レビュー", completed: false },
    ],
    memos: [],
  },
  {
    title: "チーム合宿企画",
    completed: false,
    status: Status.TODO,
    startDate: new Date("2025-10-12"),
    endDate: new Date("2025-10-20"),
    priority: Priority.LOW,
    summary: null,
    userId: user.id,
    checklists: [
      { title: "日程調整", completed: false },
      { title: "会場予約", completed: false },
      { title: "アクティビティ企画", completed: false },
    ],
    memos: [
      { content: "箱根温泉を候補に", createdAt: new Date("2025-10-13") },
    ],
  },
  {
    title: "テスト自動化",
    completed: false,
    status: Status.IN_PROGRESS,
    startDate: new Date("2025-10-15"),
    endDate: null,
    priority: Priority.MEDIUM,
    summary: "E2Eテストの自動化を推進",
    userId: user.id,
    checklists: [
      { title: "ツール選定", completed: true },
      { title: "テストシナリオ作成", completed: false },
      { title: "CI/CD組み込み", completed: false },
    ],
    memos: [],
  },
  {
    title: "インフラコスト削減",
    completed: false,
    status: Status.TODO,
    startDate: new Date("2025-10-18"),
    endDate: new Date("2025-10-30"),
    priority: Priority.MEDIUM,
    summary: "クラウドリソースの最適化",
    userId: user.id,
    checklists: [
      { title: "利用状況分析", completed: false },
      { title: "不要リソース削除", completed: false },
      { title: "プラン見直し", completed: false },
    ],
    memos: [
      { content: "20%削減目標", createdAt: new Date("2025-10-18") },
    ],
  },
  {
    title: "採用活動",
    completed: false,
    status: Status.IN_PROGRESS,
    startDate: new Date("2025-10-20"),
    endDate: new Date("2025-11-15"),
    priority: Priority.HIGH,
    summary: "エンジニア2名の採用",
    userId: user.id,
    checklists: [
      { title: "求人票作成", completed: true },
      { title: "媒体掲載", completed: true },
      { title: "書類選考", completed: false },
      { title: "面接実施", completed: false },
    ],
    memos: [],
  },
  {
    title: "ドキュメント整備",
    completed: true,
    status: Status.DONE,
    startDate: new Date("2025-10-22"),
    endDate: new Date("2025-10-28"),
    priority: Priority.LOW,
    summary: null,
    userId: user.id,
    checklists: [
      { title: "README更新", completed: true },
      { title: "環境構築手順書作成", completed: true },
    ],
    memos: [],
  },

  // 11月のデータ (10件)
  {
    title: "新機能リリース準備",
    completed: false,
    status: Status.IN_PROGRESS,
    startDate: new Date("2025-11-01"),
    endDate: new Date("2025-11-10"),
    priority: Priority.EMERGENCY,
    summary: "v2.0リリースに向けた最終準備",
    userId: user.id,
    checklists: [
      { title: "QAテスト完了", completed: true },
      { title: "リリースノート作成", completed: false },
      { title: "デプロイ計画策定", completed: false },
      { title: "ロールバック手順確認", completed: false },
    ],
    memos: [
      { content: "11/10 20:00リリース予定", createdAt: new Date("2025-11-02") },
    ],
  },
  {
    title: "障害対応レポート作成",
    completed: true,
    status: Status.DONE,
    startDate: new Date("2025-11-03"),
    endDate: new Date("2025-11-05"),
    priority: Priority.HIGH,
    summary: "先月発生した障害の分析と再発防止策",
    userId: user.id,
    checklists: [
      { title: "原因調査", completed: true },
      { title: "影響範囲特定", completed: true },
      { title: "対策立案", completed: true },
    ],
    memos: [],
  },
  {
    title: "年末キャンペーン企画",
    completed: false,
    status: Status.TODO,
    startDate: new Date("2025-11-05"),
    endDate: new Date("2025-11-20"),
    priority: Priority.MEDIUM,
    summary: "年末商戦に向けたプロモーション",
    userId: user.id,
    checklists: [
      { title: "企画立案", completed: false },
      { title: "予算確保", completed: false },
      { title: "デザイン発注", completed: false },
    ],
    memos: [
      { content: "12月第2週開始予定", createdAt: new Date("2025-11-06") },
    ],
  },
  {
    title: "技術ブログ執筆",
    completed: false,
    status: Status.TODO,
    startDate: null,
    endDate: new Date("2025-11-15"),
    priority: Priority.LOW,
    summary: null,
    userId: user.id,
    checklists: [
      { title: "テーマ選定", completed: false },
      { title: "下書き作成", completed: false },
      { title: "レビュー依頼", completed: false },
    ],
    memos: [],
  },
  {
    title: "依存ライブラリ更新",
    completed: false,
    status: Status.IN_PROGRESS,
    startDate: new Date("2025-11-08"),
    endDate: new Date("2025-11-12"),
    priority: Priority.MEDIUM,
    summary: "セキュリティパッチとバージョンアップ",
    userId: user.id,
    checklists: [
      { title: "更新対象リスト作成", completed: true },
      { title: "互換性確認", completed: false },
      { title: "テスト実施", completed: false },
    ],
    memos: [
      { content: "脆弱性2件対応必要", createdAt: new Date("2025-11-08") },
    ],
  },
  {
    title: "オフィス移転準備",
    completed: false,
    status: Status.TODO,
    startDate: new Date("2025-11-10"),
    endDate: new Date("2025-11-30"),
    priority: Priority.HIGH,
    summary: "新オフィスへの移転計画",
    userId: user.id,
    checklists: [
      { title: "レイアウト設計", completed: false },
      { title: "備品リスト作成", completed: false },
      { title: "引っ越し業者選定", completed: false },
      { title: "ネットワーク構築", completed: false },
    ],
    memos: [],
  },
  {
    title: "ユーザーアンケート実施",
    completed: false,
    status: Status.TODO,
    startDate: new Date("2025-11-12"),
    endDate: new Date("2025-11-18"),
    priority: Priority.MEDIUM,
    summary: "サービス改善のためのフィードバック収集",
    userId: user.id,
    checklists: [
      { title: "質問項目作成", completed: false },
      { title: "配信設定", completed: false },
      { title: "結果分析", completed: false },
    ],
    memos: [
      { content: "回答率30%以上目標", createdAt: new Date("2025-11-12") },
    ],
  },
  {
    title: "年次レビュー準備",
    completed: false,
    status: Status.TODO,
    startDate: new Date("2025-11-15"),
    endDate: new Date("2025-11-25"),
    priority: Priority.LOW,
    summary: null,
    userId: user.id,
    checklists: [
      { title: "目標達成度確認", completed: false },
      { title: "自己評価記入", completed: false },
    ],
    memos: [],
  },
  {
    title: "バックアップ体制見直し",
    completed: false,
    status: Status.IN_PROGRESS,
    startDate: new Date("2025-11-18"),
    endDate: null,
    priority: Priority.HIGH,
    summary: "DR対策の強化",
    userId: user.id,
    checklists: [
      { title: "現状確認", completed: true },
      { title: "リストア訓練", completed: false },
      { title: "手順書更新", completed: false },
    ],
    memos: [
      { content: "RTO/RPO見直し", createdAt: new Date("2025-11-19") },
    ],
  },
  {
    title: "来期予算策定",
    completed: false,
    status: Status.TODO,
    startDate: new Date("2025-11-20"),
    endDate: new Date("2025-11-30"),
    priority: Priority.HIGH,
    summary: "2026年度の予算計画",
    userId: user.id,
    checklists: [
      { title: "各部署ヒアリング", completed: false },
      { title: "予算案作成", completed: false },
      { title: "経営会議提出", completed: false },
    ],
    memos: [
      { content: "前年比10%増で検討", createdAt: new Date("2025-11-21") },
    ],
  },
];
// ...existing code...

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
