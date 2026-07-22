[1] INIT|P0|NAT:Bosnian|DEST:China|$2|FACEUP:[4:Payday,5:Penalty,6:Payday,11:International Driving Permit,12:Payday,13:Travel Brochure]
[1] INIT|P1|NAT:Chinese|DEST:Democratic Republic of Congo|$6|FACEUP:[4:Payday,5:Politician Approves You,6:Swap Wallets,11:Mental Fog,12:Letter of Recommendation,13:Rummage Sale]
[1] INIT|P2|NAT:Congolese|DEST:France|$2|FACEUP:[4:Blacklisted,5:Copy of Birth Certificate,6:Personality Test,11:Vehicle Registration Papers,12:Physical Exam,13:Star Power]
[1] INIT|P3|NAT:French|DEST:Russia|$5|FACEUP:[4:Notebook,5:Support Group Motivates You,6:Learn Song from Your Destination,11:Salvage,12:Subscribe to Travel Updates,13:Coffee with Airport Employee]
[1] T1|P0|BUY:Travel Brochure|FROM:P0|COST:2
[1] T1|P0|REV|S10:Write Last Will and Testament
[2] T2|P1|PAY_FEE:1|TO:P3
[2] T2|P1|BUY:Coffee with Airport Employee|FROM:P3|COST:2
[2] T2|P3|REV|S10:Language Classes
[3] T3|P2|PAY_FEE:1|TO:P3
[3] T3|P2|DISC:Subscribe to Travel Updates|FROM:P3|GAIN:2
[3] T3|P3|REV|S9:Favorable Cultural Opinion
[4] T4|P3|PAY_FEE:1|TO:P0
[4] T4|P3|BUY:Write Last Will and Testament|FROM:P0|COST:2
[5] T5|P0|STEAL:Passport|SKIP_NEXT
[6] T6|P1|BUY:Letter of Recommendation|FROM:P1|COST:3
[7] T7|P2|BUY:Physical Exam|FROM:P2|COST:3
[8] T8|P3|BUY:Language Classes|FROM:P3|COST:3
[9] T9|P0|SKIP_TURN
[10] T10|P1|STEAL:Passport|SKIP_NEXT
[11] T11|P2|STEAL:Passport|SKIP_NEXT
[12] T12|P3|STEAL:Passport|SKIP_NEXT
[13] T13|P0|ACT:Payday
[13] T13|PAYDAY|SALARIES:[1,1,1,1]
[13] T13|P0|REV|S9:Attend Security Training
[14] T14|P1|SKIP_TURN
[15] T15|P2|SKIP_TURN
[16] T16|P3|SKIP_TURN
[17] T17|P0|PAY_FEE:1|TO:P3
[17] T17|P0|ACT:Salvage
[17] T17|P0|ACT:Salvage|GAIN:1|KEEP
[17] T17|P3|REV|S7:Island Paradise
[17] T17|P3|REV|S8:Endorsement from Royalty
[18] T18|P1|STEAL:Ticket|SKIP_NEXT
[18] T18|P1|TICKET_PASSPORT_BONUS|GAIN:1A
[19] T19|Player 1 gains $1 from Salvage.
[19] T19|P2|ACT:Star Power
[19] T19|P2|ACT:Star Power|GAIN:1|KEEP
[19] T19|P2|REV|S9:Reward
[19] T19|P2|REV|S10:Payday
[20] T20|P3|SELL:Language Classes|GAIN:2
[20] T20|Player 1 gains $1 from Salvage.
[20] T20|P3|BUY:Endorsement from Royalty|FROM:P3|COST:3
[20] T20|P2|STAR_POWER|GAIN:1|PASS_TO:P3
[21] T21|P0|BUY:Attend Security Training|FROM:P0|COST:3
[22] T22|P1|SKIP_TURN
[23] T23|P2|PAY_FEE:2|TO:P3
[23] T23|P2|DISC:Favorable Cultural Opinion|FROM:P3|GAIN:2
[23] T23|Player 1 gains $1 from Salvage.
[24] T24|P3|SELL:Endorsement from Royalty|GAIN:2
[24] T24|Player 1 gains $1 from Salvage.
[24] T24|P3|BUY:Learn Song from Your Destination|FROM:P3|COST:2
[24] T24|P3|REV|S3:Pandemic / Economic Stimulus
[25] T25|P0|ACT:Payday
[25] T25|PAYDAY|SALARIES:[1,1,1,1]
[25] T25|P0|REV|S3:Residence Address in Destination
[26] T26|P1|PAY_FEE:2|TO:P0
[26] T26|P1|DISC:Residence Address in Destination|FROM:P0|GAIN:2
[26] T26|Player 1 gains $1 from Salvage.
[27] T27|P2|PAY_FEE:3|TO:P0
[27] T27|P2|DISC:International Driving Permit|FROM:P0|GAIN:2
[27] T27|Player 1 gains $1 from Salvage.
[27] T27|P0|REV|S7:Insider
[27] T27|P0|REV|S8:Payday
[28] T28|P3|SELL:Learn Song from Your Destination|GAIN:2
[28] T28|Player 1 gains $1 from Salvage.
[28] T28|P3|BUY:Support Group Motivates You|FROM:P3|COST:2
[28] T28|P3|REV|S2:Pandemic / Economic Stimulus
[29] T29|P0|ACT:Insider
[29] T29|P0|KEEP:Insider
[30] T30|Player 1 gains $1 from Salvage.
[30] T30|P1|ACT:Rummage Sale
[30] T30|P1|ACT:Rummage Sale|GAIN:3
[30] T30|P1|REV|S9:Payday
[30] T30|P1|REV|S10:Listen to the News
[31] T31|Player 1 gains $1 from Salvage.
[31] T31|P2|ACT:Reward
[31] T31|P2|ACT:Reward|DELTA:[-1,-1,4,-1]
[32] T32|P3|SELL:Support Group Motivates You|GAIN:2
[32] T32|Player 1 gains $1 from Salvage.
[32] T32|P3|PAY_FEE:2|TO:P1
[32] T32|P3|BUY:Listen to the News|FROM:P1|COST:2
[33] T33|P0|ACT:Payday
[33] T33|PAYDAY|SALARIES:[2,1,1,1]
[34] T34|Player 1 gains $1 from Salvage.
[34] T34|P1|ACT:Mental Fog
[34] T34|P1|ACT:Mental Fog|LOSS:1
[34] T34|P1|REV|S7:Payday
[34] T34|P1|REV|S8:Payday
[35] T35|Player 1 gains $1 from Salvage.
[35] T35|P2|ACT:Payday
[35] T35|PAYDAY|SALARIES:[2,1,1,1]
[36] T36|P3|STEAL:Ticket|SKIP_NEXT
[36] T36|P3|TICKET_PASSPORT_BONUS|GAIN:1A
[37] T37|P0|ACT:Payday
[37] T37|PAYDAY|SALARIES:[2,1,1,1]
[37] T37|P0|REV|S0:Underdog
[38] T38|Player 1 gains $1 from Salvage.
[38] T38|P1|ACT:Payday
[38] T38|PAYDAY|SALARIES:[2,1,1,1]
[39] T39|P2|BUY:Personality Test|FROM:P2|COST:3
[39] T39|P2|REV|S3:Internship in Your Destination
[40] T40|P3|SKIP_TURN
[41] T41|P0|PAY_FEE:2|TO:P2
[41] T41|P0|BUY:Internship in Your Destination|FROM:P2|COST:4
[41] T41|P3|STAR_POWER|GAIN:1|PASS_TO:P0
[42] T42|P1|PAY_FEE:3|TO:P2
[42] T42|P1|DISC:Vehicle Registration Papers|FROM:P2|GAIN:2
[42] T42|Player 1 gains $1 from Salvage.
[42] T42|P2|REV|S7:Travel Wallet
[42] T42|P2|REV|S8:Payday
[43] T43|Player 1 gains $1 from Salvage.
[43] T43|P2|ACT:Payday
[43] T43|PAYDAY|SALARIES:[2,1,1,1]
[44] T44|P3|PAY_FEE:3|TO:P2
[44] T44|P3|DISC:Travel Wallet|FROM:P2|GAIN:2
[44] T44|Player 1 gains $1 from Salvage.
[45] T45|P0|BUY_POOL:Ticket|COST:2
[45] T45|P0|TICKET_PASSPORT_BONUS|GAIN:1A
[46] T46|P1|PAY_FEE:4|TO:P2
[46] T46|P1|DISC:Copy of Birth Certificate|FROM:P2|GAIN:2
[46] T46|Player 1 gains $1 from Salvage.
[46] T46|P2|REV|S2:Payday
[47] T47|Player 1 gains $1 from Salvage.
[47] T47|P2|ACT:Blacklisted
[47] T47|P2|ACT:Blacklisted|LOSS:1|KEEP
[47] T47|P2|REV|S0:Stellar Reputation
[47] T47|P2|REV|S1:Payday
[48] T48|Player 1 gains $1 from Salvage.
[48] T48|P3|ACT:Pandemic / Economic Stimulus
[48] T48|ROLL_D6:4
[48] T48|P3|ACT:PANDEMIC_STIMULUS|DELTA:[-4,-4,-4,-4]
[49] T49|ROLL_D6:2
[49] T49|P0|COLLEGE_APP|ROLL:2|TUITION:3|RES:PASS
[50] T50|Player 1 gains $1 from Salvage.
[50] T50|P1|ACT:Payday
[50] T50|PAYDAY|SALARIES:[0,1,1,1]
[51] T51|Player 1 gains $1 from Salvage.
[51] T51|P2|BLACKLISTED|LOSS:1
[51] T51|P2|ACT:Stellar Reputation
[51] T51|P2|KEEP:Stellar Reputation
[52] T52|Player 1 gains $1 from Salvage.
[52] T52|P3|ACT:Island Paradise
[52] T52|P3|ACT:Island Paradise|DELTA:[0,1,0,2]
[53] T53|ROLL_D6:2
[53] T53|P0|GRAD|ROLL:2|RES:PASS|SALARY_INC:1
[53] T53|ROLL_D6:5
[53] T53|P0|COLLEGE_APP|ROLL:5|TUITION:7|RES:PASS
[54] T54|Player 1 gains $1 from Salvage.
[54] T54|P1|ACT:Payday
[54] T54|PAYDAY|SALARIES:[0,1,1,1]
[54] T54|P1|REV|S0:Frontrunner
[55] T55|P2|PAY_FEE:4|TO:P3
[55] T55|P2|DISC:Notebook|FROM:P3|GAIN:2
[55] T55|Player 1 gains $1 from Salvage.
[55] T55|P2|BLACKLISTED|LOSS:1
[55] T55|P3|REV|S0:Payday
[55] T55|P3|REV|S1:Network Fair
[56] T56|Player 1 gains $1 from Salvage.
[56] T56|P3|ACT:Pandemic / Economic Stimulus
[56] T56|ROLL_D6:3
[56] T56|P3|ACT:PANDEMIC_STIMULUS|DELTA:[3,3,3,3]
[57] T57|ROLL_D6:6
[57] T57|P0|GRAD|ROLL:6|RES:FAIL
[57] T57|P0|PAY_FEE:3|TO:P3
[57] T57|P0|BUY:Network Fair|FROM:P3|COST:3
[58] T58|Player 1 gains $1 from Salvage.
[58] T58|P1|ACT:Frontrunner
[58] T58|P1|ACT:Frontrunner|MONEY_PLACED:1|KEEP
[59] T59|Player 1 gains $1 from Salvage.
[59] T59|P2|BLACKLISTED|LOSS:1
[59] T59|P2|ACT:Payday
[59] T59|PAYDAY|SALARIES:[0,1,1,1]
[59] T59|P1|FRONTRUNNER_ADD:1|TOTAL:2
[59] T59|P1|FRONTRUNNER_PASS|TO:P0
[60] T60|Player 1 gains $1 from Salvage.
[60] T60|P3|ACT:Payday
[60] T60|PAYDAY|SALARIES:[0,1,1,1]
[60] T60|P0|FRONTRUNNER_ADD:1|TOTAL:3
[60] T60|P0|FRONTRUNNER_PASS|TO:P3
[60] T60|P3|FRONTRUNNER_ADD:1|TOTAL:4
[60] T60|P3|FRONTRUNNER_PASS|TO:P2
[61] T61|ROLL_D6:1
[61] T61|P0|GRAD|ROLL:1|RES:PASS|SALARY_INC:3
[61] T61|P0|PAY_FEE:4|TO:P2
[61] T61|P0|ACT:Payday
[61] T61|PAYDAY|SALARIES:[6,1,1,1]
[61] T61|P2|FRONTRUNNER_ADD:1|TOTAL:5
[61] T61|P2|FRONTRUNNER_PASS|TO:P1
[62] T62|Player 1 gains $1 from Salvage.
[62] T62|P1|ACT:Payday
[62] T62|PAYDAY|SALARIES:[6,1,1,1]
[62] T62|P1|FRONTRUNNER_PASS|TO:P0
[63] T63|P2|PAY_FEE:5|TO:P1
[63] T63|P2|BUY:Politician Approves You|FROM:P1|COST:3
[63] T63|P0|STAR_POWER|GAIN:1|PASS_TO:P2
[63] T63|P1|REV|S1:Payday
[64] T64|P3|PAY_FEE:4|TO:P0
[64] T64|Player 1 gains $1 from Salvage.
[64] T64|P3|ACT:Underdog
[64] T64|P3|ACT:Underdog|LOSS:1|KEEP
[64] T64|P3|UNDERDOG|LOSS:1|PASS_TO:P2
[65] T65|P0|BUY_POOL:Ticket|COST:2
[66] T66|Player 1 gains $1 from Salvage.
[66] T66|P1|ACT:Swap Wallets
[66] T66|P1|ACT:Swap Wallets|SWAP:P0
[66] T66|P1|REV|S2:Suspect
[66] T66|P1|REV|S3:Payday
[67] T67|P2|RECLAIM:Ticket|FROM:P0|COST:7
[67] T67|P2|TICKET_PASSPORT_BONUS|GAIN:1A
[68] T68|P3|PAY_FEE:5|TO:P1
[68] T68|Player 1 gains $1 from Salvage.
[68] T68|P3|ACT:Suspect
[68] T68|P3|ACT:Suspect|LOSS:1
[68] T68|P3|ACT:Suspect|DISC:Listen to the News
[68] T68|Player 1 gains $1 from Salvage.
[69] T69|P0|ACT:Penalty
[69] T69|P0|ACT:Penalty|LOSS:1|KEEP
[69] T69|P0|REV|S1:Payday
[69] T69|P0|REV|S2:Cookies for Neighbor from Destination
[70] T70|Player 1 gains $1 from Salvage.
[70] T70|P1|ACT:Payday
[70] T70|PAYDAY|SALARIES:[6,1,1,1]
[70] T70|P0|FRONTRUNNER_PASS|TO:P3
[70] T70|P3|FRONTRUNNER_PASS|TO:P2
[71] T71|P2|PAY_FEE:5|TO:P0
[71] T71|P2|DISC:Cookies for Neighbor from Destination|FROM:P0|GAIN:2
[71] T71|Player 1 gains $1 from Salvage.
[71] T71|P2|BLACKLISTED|LOSS:1
[72] T72|ROLL_D6:4
[72] T72|P3|COLLEGE_APP|ROLL:4|TUITION:9|RES:PASS
[73] T73|P0|ACT:Payday
[73] T73|PAYDAY|SALARIES:[6,1,1,0]
[73] T73|P2|FRONTRUNNER_PASS|TO:P1
[74] T74|Player 1 gains $1 from Salvage.
[74] T74|P1|ACT:Payday
[74] T74|PAYDAY|SALARIES:[6,1,1,0]
[74] T74|P1|FRONTRUNNER_PASS|TO:P0
[74] PHASE2_START
[74] PHASE2|P0|TRADE|$50:+15A|TOTAL_A:20
[74] PHASE2|P1|TRADE|$36:+12A|PEN_D:-2A|TOTAL_A:11
[74] PHASE2|P2|TRADE|$8:+2A|TOTAL_A:3
[74] PHASE2|P3|TRADE|PEN_M:-1A|PEN_D:-3A|TOTAL_A:-3
[74] PHASE2|P2|SELECT_LANE:Lane 5|TKN:3
[74] PHASE2|P2|CROSS:PASS|PAID_A:3|REM_A:0
[74] PHASE2|P3|SELECT_LANE:Lane 1|TKN:7
[74] PHASE2|P3|CROSS:FAIL_LOW_A
[74] PHASE2|P0|SELECT_LANE:Lane 1|TKN:7
[74] PHASE2|P0|CROSS:PASS|PAID_A:7|REM_A:13
[74] PHASE2|P1|SELECT_LANE:Lane 1|TKN:6
[74] PHASE2|P1|CROSS:PASS|PAID_A:6|REM_A:5
[74] GAME_OVER|WINNER: Player 1 (Assurance: 13, Money: $2)

[1] INIT|P0|NAT:Bosnian|DEST:China|$2|FACEUP:[4:Vaccination Record,5:Payday,6:VIP,11:Suspect,12:Support Group Motivates You,13:Subscribe to Travel Updates]
[1] INIT|P1|NAT:Chinese|DEST:Democratic Republic of Congo|$6|FACEUP:[4:Fancy Clothes,5:Payday,6:Become World Famous,11:Payday,12:Favorable Cultural Opinion,13:Salvage]
[1] INIT|P2|NAT:Congolese|DEST:France|$2|FACEUP:[4:Payday,5:Payday,6:Pet Passport,11:Pandemic / Economic Stimulus,12:Payday,13:Friend moves to your Destination]
[1] INIT|P3|NAT:French|DEST:Russia|$5|FACEUP:[4:Identical Twin,5:Vehicle Registration Papers,6:Physical Exam,11:Travel Wallet,12:FOMO,13:Social Butterfly]
[1] INIT|P4|NAT:Russian|DEST:Senegal|$5|FACEUP:[4:Listen to the News,5:Lost & Found,6:Blacklisted,11:Keep Calm,12:Travel Brochure,13:Payday]
[1] T1|P0|BUY:Support Group Motivates You|FROM:P0|COST:2
[2] T2|P1|PAY_FEE:1|TO:P2
[2] T2|P1|BUY:Friend moves to your Destination|FROM:P2|COST:2
[2] T2|P2|REV|S10:Payday
[3] T3|P2|PAY_FEE:1|TO:P0
[3] T3|P2|BUY:Subscribe to Travel Updates|FROM:P0|COST:2
[3] T3|P0|REV|S9:Payday
[3] T3|P0|REV|S10:Background Check
[4] T4|P3|PAY_FEE:1|TO:P4
[4] T4|P3|BUY:Travel Brochure|FROM:P4|COST:2
[5] T5|P4|PAY_FEE:1|TO:P3
[5] T5|P4|BUY:Travel Wallet|FROM:P3|COST:3
[5] T5|P3|REV|S7:Language Classes
[6] T6|P0|STEAL:Ticket|SKIP_NEXT
[7] T7|P1|SELL:Friend moves to your Destination|GAIN:2
[7] T7|P1|BUY:Favorable Cultural Opinion|FROM:P1|COST:4
[8] T8|P2|STEAL:Passport|SKIP_NEXT
[9] T9|P3|SELL:Travel Brochure|GAIN:2
[9] T9|P3|BUY:Language Classes|FROM:P3|COST:3
[10] T10|P4|STEAL:Passport|SKIP_NEXT
[11] T11|P0|SKIP_TURN
[12] T12|P1|STEAL:Ticket|SKIP_NEXT
[13] T13|P2|SKIP_TURN
[14] T14|P3|STEAL:Ticket|SKIP_NEXT
[15] T15|P4|SKIP_TURN
[16] T16|P0|ACT:Payday
[16] T16|PAYDAY|SALARIES:[1,1,1,1,1]
[17] T17|P1|SKIP_TURN
[18] T18|P2|ACT:Payday
[18] T18|PAYDAY|SALARIES:[1,1,1,1,1]
[18] T18|P2|REV|S9:Trousers Fall Down
[19] T19|P3|SKIP_TURN
[20] T20|ROLL_D6:6
[20] T20|P4|COLLEGE_APP|ROLL:6|TUITION:11|RES:FAIL
[20] T20|P4|ACT:Keep Calm
[20] T20|P4|ACT:Keep Calm|GAIN:1|KEEP
[20] T20|P4|REV|S7:Learn Song from Your Destination
[20] T20|P4|REV|S8:Politician Approves You
[21] T21|P0|PAY_FEE:1|TO:P1
[21] T21|P0|ACT:Salvage
[21] T21|P0|ACT:Salvage|GAIN:1|KEEP
[21] T21|P1|REV|S9:Mental Fog
[21] T21|P1|REV|S10:Notebook
[22] T22|P1|BUY:Notebook|FROM:P1|COST:2
[23] T23|ROLL_D6:4
[23] T23|P2|COLLEGE_APP|ROLL:4|TUITION:6|RES:FAIL
[23] T23|Player 1 gains $1 from Salvage.
[23] T23|P2|ACT:Payday
[23] T23|PAYDAY|SALARIES:[1,1,1,1,1]
[24] T24|ROLL_D6:6
[24] T24|P3|COLLEGE_APP|ROLL:6|TUITION:11|RES:FAIL
[24] T24|Player 1 gains $1 from Salvage.
[24] T24|P3|ACT:FOMO
[24] T24|P3|ACT:FOMO|LOSS:1
[24] T24|P3|REV|S8:Copy of Birth Certificate
[25] T25|P4|BUY:Learn Song from Your Destination|FROM:P4|COST:2
[26] T26|P0|BUY:Background Check|FROM:P0|COST:4
[27] T27|P1|SELL:Notebook|GAIN:2
[27] T27|Player 1 gains $1 from Salvage.
[27] T27|P1|PAY_FEE:2|TO:P3
[27] T27|P1|BUY:Copy of Birth Certificate|FROM:P3|COST:2
[28] T28|ROLL_D6:3
[28] T28|P2|COLLEGE_APP|ROLL:3|TUITION:4|RES:FAIL
[28] T28|Player 1 gains $1 from Salvage.
[28] T28|P2|ACT:Pandemic / Economic Stimulus
[28] T28|ROLL_D6:3
[28] T28|P2|ACT:PANDEMIC_STIMULUS|DELTA:[-3,-1,-1,-3,-3]
[28] T28|P2|REV|S7:Insider
[28] T28|P2|REV|S8:Network Fair
[29] T29|P3|PAY_FEE:2|TO:P2
[29] T29|P3|DISC:Network Fair|FROM:P2|GAIN:2
[29] T29|Player 1 gains $1 from Salvage.
[30] T30|P4|STEAL:Ticket|SKIP_NEXT
[30] T30|P4|TICKET_PASSPORT_BONUS|GAIN:1A
[31] T31|P0|STEAL:Passport|SKIP_NEXT
[31] T31|P0|TICKET_PASSPORT_BONUS|GAIN:1A
[32] T32|P1|STEAL:Passport|SKIP_NEXT
[32] T32|P1|TICKET_PASSPORT_BONUS|GAIN:1A
[33] T33|P2|PAY_FEE:2|TO:P4
[33] T33|P2|DISC:Politician Approves You|FROM:P4|GAIN:2
[33] T33|Player 1 gains $1 from Salvage.
[34] T34|Player 1 gains $1 from Salvage.
[34] T34|P3|ACT:Social Butterfly
[34] T34|P3|ACT:Social Butterfly|TAKE:MONEY:3|FROM:P0
[34] T34|P3|REV|S9:Payday
[34] T34|P3|REV|S10:Letter of Recommendation
[35] T35|P4|SKIP_TURN
[36] T36|P0|SKIP_TURN
[37] T37|P1|SKIP_TURN
[38] T38|Player 1 gains $1 from Salvage.
[38] T38|P2|ACT:Trousers Fall Down
[38] T38|P2|ACT:Trousers Fall Down|LOSS:3
[39] T39|P3|BUY:Letter of Recommendation|FROM:P3|COST:3
[40] T40|P4|BUY:Listen to the News|FROM:P4|COST:2
[40] T40|P4|REV|S0:Payday
[41] T41|P0|ACT:VIP
[41] T41|P0|ACT:VIP|GAIN:1
[41] T41|P0|REV|S3:Payday
[42] T42|Player 1 gains $1 from Salvage.
[42] T42|P1|ACT:Mental Fog
[42] T42|P1|ACT:Mental Fog|LOSS:1
[43] T43|Player 1 gains $1 from Salvage.
[43] T43|P2|ACT:Payday
[43] T43|PAYDAY|SALARIES:[1,1,1,1,1]
[44] T44|P3|STEAL:Passport|SKIP_NEXT
[44] T44|P3|TICKET_PASSPORT_BONUS|GAIN:1A
[45] T45|Player 1 gains $1 from Salvage.
[45] T45|P4|ACT:Payday
[45] T45|PAYDAY|SALARIES:[1,1,1,1,1]
[45] T45|P4|REV|S9:Language Phrasebook
[45] T45|P4|REV|S10:Cookies for Neighbor from Destination
[46] T46|ROLL_D6:3
[46] T46|P0|COLLEGE_APP|ROLL:3|TUITION:4|RES:PASS
[47] T47|Player 1 gains $1 from Salvage.
[47] T47|P1|ACT:Payday
[47] T47|PAYDAY|SALARIES:[0,1,1,1,1]
[47] T47|P1|REV|S7:Pandemic / Economic Stimulus
[47] T47|P1|REV|S8:Payday
[48] T48|Player 1 gains $1 from Salvage.
[48] T48|P2|ACT:Insider
[48] T48|P2|KEEP:Insider
[49] T49|P3|SKIP_TURN
[50] T50|P4|BUY:Cookies for Neighbor from Destination|FROM:P4|COST:2
[51] T51|ROLL_D6:2
[51] T51|P0|GRAD|ROLL:2|RES:PASS|SALARY_INC:1
[51] T51|P0|ACT:Payday
[51] T51|PAYDAY|SALARIES:[2,1,2,1,1]
[52] T52|P1|PAY_FEE:3|TO:P2
[52] T52|P1|DISC:Pet Passport|FROM:P2|GAIN:2
[52] T52|Player 1 gains $1 from Salvage.
[52] T52|P2|REV|S2:Letter of Invitation
[52] T52|P2|REV|S3:Attend History Class
[53] T53|P2|BUY:Attend History Class|FROM:P2|COST:4
[54] T54|P3|PAY_FEE:3|TO:P2
[54] T54|P3|DISC:Letter of Invitation|FROM:P2|GAIN:2
[54] T54|Player 1 gains $1 from Salvage.
[55] T55|P4|PAY_FEE:2|TO:P1
[55] T55|P4|DISC:Become World Famous|FROM:P1|GAIN:2
[55] T55|Player 1 gains $1 from Salvage.
[55] T55|P1|REV|S3:Payday
[56] T56|P0|PAY_FEE:2|TO:P4
[56] T56|P0|BUY:Language Phrasebook|FROM:P4|COST:4
[57] T57|Player 1 gains $1 from Salvage.
[57] T57|P1|ACT:Pandemic / Economic Stimulus
[57] T57|ROLL_D6:2
[57] T57|P1|ACT:PANDEMIC_STIMULUS|DELTA:[2,2,2,2,2]
[58] T58|P2|STEAL:Ticket|SKIP_NEXT
[58] T58|P2|TICKET_PASSPORT_BONUS|GAIN:1A
[59] T59|Player 1 gains $1 from Salvage.
[59] T59|P3|ACT:Identical Twin
[59] T59|P3|ACT:Identical Twin|GAIN:1|EXTRA_TURN
[59] T59|P3|REV|S0:Coffee with Airport Employee
[59] T59|Player 1 gains $1 from Salvage.
[59] T59|P3|ACT:Payday
[59] T59|PAYDAY|SALARIES:[2,1,2,1,1]
[60] T60|P4|PAY_FEE:3|TO:P3
[60] T60|P4|DISC:Physical Exam|FROM:P3|GAIN:2
[60] T60|Player 1 gains $1 from Salvage.
[60] T60|P3|REV|S3:Payday
[61] T61|P0|PAY_FEE:3|TO:P3
[61] T61|P0|BUY:Coffee with Airport Employee|FROM:P3|COST:2
[62] T62|P1|PAY_FEE:4|TO:P3
[62] T62|P1|DISC:Vehicle Registration Papers|FROM:P3|GAIN:2
[62] T62|Player 1 gains $1 from Salvage.
[62] T62|P3|REV|S1:Life Coach
[62] T62|P3|REV|S2:Payday
[63] T63|P2|SKIP_TURN
[64] T64|Player 1 gains $1 from Salvage.
[64] T64|P3|ACT:Life Coach
[64] T64|P3|ACT:Life Coach|GAIN_A:1
[65] T65|Player 1 gains $1 from Salvage.
[65] T65|P4|ACT:Blacklisted
[65] T65|P4|ACT:Blacklisted|LOSS:1|KEEP
[65] T65|P4|REV|S3:Nostalgia
[66] T66|P0|PAY_FEE:4|TO:P4
[66] T66|P0|ACT:Lost & Found
[66] T66|P0|ACT:Lost & Found|TAKE:DOC:Letter of Recommendation|FROM:P3
[66] T66|P4|REV|S1:Payday
[66] T66|P4|REV|S2:Camping
[67] T67|Player 1 gains $1 from Salvage.
[67] T67|P1|ACT:Payday
[67] T67|PAYDAY|SALARIES:[2,1,2,1,1]
[68] T68|Player 1 gains $1 from Salvage.
[68] T68|P2|ACT:Payday
[68] T68|PAYDAY|SALARIES:[2,1,2,1,1]
[68] T68|P2|REV|S0:Reward
[68] T68|P2|REV|S1:Payday
[69] T69|Player 1 gains $1 from Salvage.
[69] T69|P3|ACT:Payday
[69] T69|PAYDAY|SALARIES:[2,1,2,1,1]
[70] T70|Player 1 gains $1 from Salvage.
[70] T70|P4|BLACKLISTED|LOSS:1
[70] T70|P4|ACT:Nostalgia
[70] T70|P4|ACT:Nostalgia|GAIN:2
[71] T71|P0|PAY_FEE:5|TO:P2
[71] T71|P0|ACT:Reward
[71] T71|P0|ACT:Reward|DELTA:[5,-1,-1,-1,-1]
[72] T72|Player 1 gains $1 from Salvage.
[72] T72|P1|ACT:Payday
[72] T72|PAYDAY|SALARIES:[2,1,2,1,1]
[73] T73|Player 1 gains $1 from Salvage.
[73] T73|P2|ACT:Payday
[73] T73|PAYDAY|SALARIES:[2,1,2,1,1]
[74] T74|Player 1 gains $1 from Salvage.
[74] T74|P3|ACT:Payday
[74] T74|PAYDAY|SALARIES:[2,1,2,1,1]
[75] T75|Player 1 gains $1 from Salvage.
[75] T75|P4|BLACKLISTED|LOSS:1
[75] T75|P4|ACT:Camping
[75] T75|P4|ACT:Camping|DELTA:[0,1,1,1,1]
[76] T76|P0|PAY_FEE:5|TO:P1
[76] T76|P0|ACT:Fancy Clothes
[76] T76|P0|ACT:Fancy Clothes|GAIN:3
[76] T76|P1|REV|S0:Payday
[77] T77|Player 1 gains $1 from Salvage.
[77] T77|P1|ACT:Payday
[77] T77|PAYDAY|SALARIES:[2,1,2,1,1]
[78] T78|P2|PAY_FEE:3|TO:P0
[78] T78|Player 1 gains $1 from Salvage.
[78] T78|P2|ACT:Suspect
[78] T78|P2|ACT:Suspect|LOSS:1
[78] T78|P2|ACT:Suspect|DISC:Attend History Class
[78] T78|Player 1 gains $1 from Salvage.
[78] T78|P0|REV|S7:Get Engaged to a Native
[78] T78|P0|REV|S8:Shredder Accident
[79] T79|P3|PAY_FEE:4|TO:P0
[79] T79|P3|DISC:Get Engaged to a Native|FROM:P0|GAIN:2
[79] T79|Player 1 gains $1 from Salvage.
[80] T80|Player 1 gains $1 from Salvage.
[80] T80|P4|BLACKLISTED|LOSS:1
[80] T80|P4|ACT:Payday
[80] T80|PAYDAY|SALARIES:[2,1,2,1,1]
[81] T81|P0|PAY_FEE:5|TO:P1
[81] T81|P0|ACT:Payday
[81] T81|PAYDAY|SALARIES:[2,1,2,1,1]
[81] T81|P1|REV|S1:Payday
[81] T81|P1|REV|S2:Internship in Your Destination
[82] T82|Player 1 gains $1 from Salvage.
[82] T82|P1|ACT:Payday
[82] T82|PAYDAY|SALARIES:[2,1,2,1,1]
[83] T83|P2|PAY_FEE:4|TO:P1
[83] T83|P2|DISC:Internship in Your Destination|FROM:P1|GAIN:2
[83] T83|Player 1 gains $1 from Salvage.
[84] T84|P3|PAY_FEE:5|TO:P0
[84] T84|Player 1 gains $1 from Salvage.
[84] T84|P3|ACT:Shredder Accident
[84] T84|P3|ACT:Shredder Accident|LOSS:1|NO_DOCS
[85] T85|P4|PAY_FEE:4|TO:P0
[85] T85|P4|DISC:Vaccination Record|FROM:P0|GAIN:2
[85] T85|Player 1 gains $1 from Salvage.
[85] T85|P4|BLACKLISTED|LOSS:1
[85] T85|P0|REV|S0:Travel Concierge
[86] T86|P0|BUY:Travel Concierge|FROM:P0|COST:4
[87] T87|ROLL_D6:3
[87] T87|P1|COLLEGE_APP|ROLL:3|TUITION:6|RES:PASS
[88] T88|ROLL_D6:4
[88] T88|P2|COLLEGE_APP|ROLL:4|TUITION:6|RES:PASS
[89] T89|ROLL_D6:2
[89] T89|P3|COLLEGE_APP|ROLL:2|TUITION:4|RES:PASS
[90] T90|Player 1 gains $1 from Salvage.
[90] T90|P4|BLACKLISTED|LOSS:1
[90] T90|P4|ACT:Payday
[90] T90|PAYDAY|SALARIES:[2,0,0,0,1]
[91] T91|ROLL_D6:1
[91] T91|P0|COLLEGE_APP|ROLL:1|TUITION:2|RES:PASS
[92] T92|ROLL_D6:1
[92] T92|P1|GRAD|ROLL:1|RES:PASS|SALARY_INC:1
[92] T92|ROLL_D6:1
[92] T92|P1|COLLEGE_APP|ROLL:1|TUITION:4|RES:PASS
[93] T93|ROLL_D6:5
[93] T93|P2|GRAD|ROLL:5|RES:FAIL
[93] T93|ROLL_D6:2
[93] T93|P2|GRAD|ROLL:2|RES:PASS|SALARY_INC:1
[93] T93|ROLL_D6:5
[93] T93|P2|COLLEGE_APP|ROLL:5|TUITION:7|RES:PASS
[94] T94|ROLL_D6:6
[94] T94|P3|GRAD|ROLL:6|RES:FAIL
[94] T94|ROLL_D6:1
[94] T94|P3|GRAD|ROLL:1|RES:PASS|SALARY_INC:1
[94] T94|ROLL_D6:2
[94] T94|P3|COLLEGE_APP|ROLL:2|TUITION:4|RES:PASS
[95] T95|ROLL_D6:3
[95] T95|P4|COLLEGE_APP|ROLL:3|TUITION:5|RES:PASS
[96] T96|ROLL_D6:4
[96] T96|P0|GRAD|ROLL:4|RES:FAIL
[96] T96|P0|ACT:Payday
[96] T96|PAYDAY|SALARIES:[0,0,0,0,0]
[96] T96|P0|REV|S1:Enter Luxury Travel Club
[96] T96|P0|REV|S2:Residence Address in Destination
[97] T97|ROLL_D6:5
[97] T97|P1|GRAD|ROLL:5|RES:FAIL
[97] T97|ROLL_D6:3
[97] T97|P1|GRAD|ROLL:3|RES:PASS|SALARY_INC:3
[97] T97|P1|PAY_FEE:5|TO:P0
[97] T97|P1|DISC:Enter Luxury Travel Club|FROM:P0|GAIN:2
[97] T97|Player 1 gains $1 from Salvage.
[98] T98|ROLL_D6:3
[98] T98|P2|GRAD|ROLL:3|RES:PASS|SALARY_INC:3
[98] T98|P2|PAY_FEE:5|TO:P0
[98] T98|P2|DISC:Residence Address in Destination|FROM:P0|GAIN:2
[98] T98|Player 1 gains $1 from Salvage.
[98] PHASE2_START
[98] PHASE2|P0|TRADE|$60:+18A|TOTAL_A:21
[98] PHASE2|P1|TRADE|$12:+4A|PEN_D:-2A|TOTAL_A:7
[98] PHASE2|P2|TRADE|$8:+2A|PEN_D:-3A|TOTAL_A:4
[98] PHASE2|P3|TRADE|$7:+2A|PEN_D:-3A|TOTAL_A:3
[98] T98|Player 1 gains $1 from Salvage.
[98] T98|P4|BLACKLISTED|LOSS:1
[98] T98|Player 1 gains $1 from Salvage.
[98] T98|P4|BLACKLISTED|LOSS:1
[98] T98|Player 1 gains $1 from Salvage.
[98] T98|P4|BLACKLISTED|LOSS:1
[98] PHASE2|P4|TRADE|$7:+2A|3C:+5A|PEN_D:-2A|TOTAL_A:6
[98] PHASE2|P3|SELECT_LANE:Lane 5|TKN:9
[98] PHASE2|P3|CROSS:FAIL_LOW_A
[98] PHASE2|P4|SELECT_LANE:Lane 5|TKN:3
[98] PHASE2|P4|CROSS:PASS|PAID_A:3|REM_A:3
[98] PHASE2|P0|SELECT_LANE:Lane 1|TKN:6
[98] PHASE2|P0|CROSS:PASS|PAID_A:6|REM_A:15
[98] PHASE2|P1|SELECT_LANE:Lane 1|TKN:7
[98] PHASE2|P1|CROSS:PASS|PAID_A:7|REM_A:0
[98] PHASE2|P2|SELECT_LANE:Lane 4|TKN:4
[98] PHASE2|P2|CROSS:PASS|PAID_A:4|REM_A:0
[98] GAME_OVER|WINNER: Player 1 (Assurance: 15, Money: $5)
