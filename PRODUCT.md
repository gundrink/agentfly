# Agentfly

Agentfly is a Solana devnet farm for four test stablecoins. nUSDC, nUSDT, nPYUSD, and nUSDe share one reserve book. A swap of any pair moves that same book, so one pool does the work of six pair markets.

It is an AMM. It is not a CLMM and not a DLMM. Liquidity is not placed in a price range on a single pair, and it is not split into constant-price bins. Eight floors sit on one shared surface around $1.

The public site is English. The network is Solana devnet. These tokens are test mints. They are not official USDC, USDT, PYUSD, or USDe.

The site is [https://agentfly-fcnj.vercel.app](https://agentfly-fcnj.vercel.app).

## Status

Live on devnet:

- The program is deployed and the book is seeded.
- Trading is enabled. Eight floors are open. A devnet swap has already settled.
- The site is the public landing page. The header shows the contract chip. A click copies the full address.
- A wallet can claim 1,000 nUSDC once.

Not on the public site yet:

- There is no wallet connect screen and no swap form on the marketing site. Swap, buy with SOL, and claim are program instructions.
- There is no mainnet deployment and no use of real funds.

## The book

Four stablecoins normally need six markets. Depth in one pair never reaches the others. Agentfly keeps the four reserves in one vector. Paying nUSDC to receive nUSDe, or paying nPYUSD to receive nUSDT, reads the same vector.

Reserves stay on a sphere. `r` is the radius. `xᵢ` is the reserve of coin `i`. `n` is the number of coins, which is 4.

| Rule | Formula | What it does |
| --- | --- | --- |
| Sphere | Σ (r − xᵢ)² = r² | Every quote stays on this surface. |
| Price | pᵢ→ⱼ = (r − xⱼ) / (r − xᵢ) | How much of coin i buys one coin j. The larger reserve is the cheaper coin. |
| Equal reserves | xᵢ = r (1 − 1/√n) | With four coins, each reserve is r / 2. The seed starts there. |
| Fee | fee = amount / 10,000 | One basis point, taken on the way in. It stays in the vault and does not re-enter the price. |
| Depeg check | min(r − x) / max(r − x) × 10,000 | The cheapest coin, in basis points of $1. A floor stops quoting when this price falls through it. |
| After a stop | r′ = r × new sum / old sum | Stopped reserves leave the quote and the radius scales down. |

One swap may stop at most three floors. Rounding favors the pool. The quote supports exact-in and exact-out.

## Floors

The seed is 1,250,000 whole tokens of each mint. It is split across eight floors. A tight floor does the trading near a dollar. A wider floor stays through a larger move. The full-range floor is 0 and does not stop.

| Floor | Share of the seed |
| --- | --- |
| $0.9995 | 40% |
| $0.9990 | 27% |
| $0.9950 | 15% |
| $0.9900 | 8% |
| $0.9800 | 4% |
| $0.9500 | 3% |
| $0.9000 | 2% |
| Full range | 1% |

When the cheapest coin falls through a floor, that slice stops quoting. The floors still inside their bound keep trading.

## Assets

The book uses its own SPL mints so the program can be the mint authority. Decimals follow the asset each test coin stands in for. Inside the program, every amount is scaled to 9 decimals.

The pool stores mints in ascending public-key order. That order is nUSDe, nUSDC, nPYUSD, nUSDT.

| Symbol | Decimals | Mint | Vault |
| --- | --- | --- | --- |
| nUSDe | 9 | `AtKin6p4ecibN42YPBN1gdgBwwU69cWqdWewj7x4tphR` | `89ksqKJSAk4YsPjbyzknycwgbHTZx6LdZbyNu16rXVpj` |
| nUSDC | 6 | `AogEbswqviQNztUJJZziERHt2SbZMEFBqxj7wQfQLyg5` | `9EndR64bdU7cuQtQtJKy5s8Ksd5XMkuHgvBhzJcyPMuq` |
| nPYUSD | 9 | `6EVpJryaSzY29qyJQwWQbMt8AbtBSQrZcMkAdHMMbZMn` | `6TXGMSJGSF7hxqPetEUtg9FmXVwcu92bs2kQVpqCAHka` |
| nUSDT | 6 | `FNEBoyu8SpihwkA5ApDii13MHwK1scKmrGsefXPkC1ru` | `7wtA1KNne2g47RxjaonxJu1vqzmGRNzjEqCiAEiAUgtb` |

## What a person can do

1. Open the site. The landing page says the book is four stables on one reserve, on Solana devnet.
2. Copy the contract from the header chip. The label is `CA :` plus the first four and last four characters.
3. Point a wallet at Solana devnet. A mainnet wallet is looking at a different cluster.
4. Swap by paying one book coin and receiving another. Both sides read the shared reserve. The fee is one basis point, kept by the pool.
5. Pay with SOL to buy any of the four book tokens. 1 SOL mints 100 whole tokens. The SOL is paid to the deployer. The sphere reserves do not move, because SOL is not one of the four stablecoins. One buy can spend at most 100 SOL.
6. Claim 1,000 nUSDC once per wallet. A second claim for that wallet is refused.

## Devnet deployment

| Account | Address |
| --- | --- |
| Cluster | Solana devnet, `https://api.devnet.solana.com` |
| Program | `GRG9CqaYABVi2Z67CBFbkq9vHC8VJ2CtvCtmqs3woHqE` |
| Pool | `8ribZ2EAvQVN1kppxXd9EfVPaTufV8D7pbpnNucdWvg` |
| Mint authority | `2v6Agxq87QcJ6rs9j8ZyU7hkphH1yYRSMTd7wZmHi4iy` |
| Deployer | `DCYGieAFCYNvmNRDj3Aoi4qTpZAVC4RsKbGUqDn4RJdp` |

The contract chip should copy the program id. The site reads `NEXT_PUBLIC_CA`, and falls back to that program id when the variable is empty.

The first confirmed swap is `a7vFHh9wJ9pNKMfPMHVJq1TkP1xzzr9TGRgEYdEpmu5JHGYw79okvbSUuy4rjWDSVJ3kRrqQN4AjYEcX91WA5UZ`. It paid 10 nUSDe and received nUSDC.

## Program surface

The program exposes these instructions:

- `initialize` creates the pool for four mints, in ascending public-key order, with trading closed.
- `seed_band` fills one floor. After the eighth floor, trading opens.
- `swap` moves one coin in and another coin out. The signer pays. Slippage and a deadline are checked on chain.
- `buy_with_sol` takes SOL and mints the chosen book token at 100 whole tokens per SOL.
- `faucet` mints 1,000 whole tokens of one book mint to the signer, once for that mint.

Custom program errors start at 6000: the book rejected the swap, the quote expired, slippage was passed, the book is not open, the faucet was already used, or pay and receive are the same token.
