// Prepare for event start
//
// 1. Create vol-xx channel
// 1. Set lunch and due reminder
// 1. Set lunch poller
// 1. Set announce event channel to general

const logger = console;
const { Slack } = require('./slack.js');

const Preparation = {};

Preparation.start = async (slackToken, name) => {
  Slack.setup(slackToken);

  logger.info(`channel name is ${name}`);

  await Slack.create_channel(name);
  const channelId = await Slack.get_channel_id(name);

  // Event channel announce
  const generalId = await Slack.get_channel_id('general');

  // Lunch
  Slack.command(channelId, '/poll', '"昼食どこらへんが好き？" "イタリアン: タンタボッカ" "イタリアン: ボガマリ・クチーナ・マリナーラ" "天丼: 高瀬" "寿司: 高瀬" "バーガー: クリバーガー" "カレー: 野菜を食べるカレーcamp" "中華: トーキョー シノワ 神子" "エスニック: Bistro ひつじや" "和食: おひつ膳" "オフィスにいます"');
  Slack.message(channelId, '厳選美味昼食店: \nhttps://github.com/shinjuku-mokumoku/shinjuku-mokumoku/blob/master/lunch/yoyogi.md');
  Slack.command(channelId, '/remind', `<#${channelId}> "@channel もうすぐlunchです！ランチアンケート ( https://github.com/shinjuku-mokumoku/shinjuku-mokumoku/blob/master/lunch/yoyogi.md ) への回答しましょう！" at 12:55`);
  Slack.command(channelId, '/remind', `<#${channelId}> "@channel lunchの時間です！ご一緒できる方は行きましょう :sparkless:" at 13:00`);

  // checkout
  Slack.command(channelId, '/remind', `<#${channelId}> "@channel checkoutまであと1hです！成果のまとめなどしていきましょう :muscle:" at 16:00`);
  Slack.command(channelId, '/remind', `<#${channelId}> "@channel checkoutの10min前です！\n今日の成果項を更新しshinjuku-mokumokuへPRをお願いします :muscle:\n\n発表ではchrome castを使います。chrome castの使い方はconnpassにありますので、はじめての方はEvent TV を対象にキャスト練習ください🙏" at 16:50`);
  Slack.command(channelId, '/remind', `<#${channelId}> "@channel checkoutの時間です :timer_clock:" at 17:00`);

  // for introduction
  Slack.message(generalId, `今日のshinjuku mokumoku slack channelは <#${channelId}> です！みなさん参加お願いします :sparkles:`);
  Slack.message(channelId, 'わからないことがあるときはまず以下を参照しましょう :point_up: \n\n イベントページ: https://shinjuku-moku.connpass.com/\n introduction資料: https://gitpitch.com/shinjuku-mokumoku/shinjuku-mokumoku# \n');
};

exports.Preparation = Preparation;