const { pgClient } = require('./client')

async function getTokenUsage(userId) {
  const sql = `select "totalTokens", "tokensLimit" from "TokenUsage" where "userId" = $1`
  const values = [userId]
  const result = await pgClient.query(sql, values)
  if (result == null) return null
  return result.rows[0]
}

async function updateTokenUsage(userId, tokenOpt = {}) {
  const { tokensLimit, totalTokens, usage = {} } = tokenOpt
  const { total_tokens } = usage

  const newTotalTokens = totalTokens + total_tokens
  let newTokensLimit = tokensLimit - total_tokens
  if (newTokensLimit < 0) newTokensLimit = 0

  const sql = `update "TokenUsage" set "totalTokens" = $1, "tokensLimit" = $2 where "userId" = $3`
  const values = [newTotalTokens, newTokensLimit, userId]
  await pgClient.query(sql, values)
}

module.exports = {
  getTokenUsage,
  updateTokenUsage,
}