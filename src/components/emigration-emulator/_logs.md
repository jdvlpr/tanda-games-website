[1] INIT|P0|NAT:Bosnian|DEST:China|$2|FACEUP:[4:Island Paradise,5:Payday,6:Rummage Sale,11:Pandemic / Economic Stimulus,12:Travel Wallet,13:Payday]
[1] INIT|P1|NAT:Chinese|DEST:Democratic Republic of Congo|$6|FACEUP:[4:Payday,5:Residence Address in Destination,6:Insider,11:Mental Fog,12:Favorable Cultural Opinion,13:Swap Wallets]
[1] T1|P0|ACT:Payday
[1] T1|PAYDAY|SALARIES:[1,1]
[1] T1|P0|REV|S10:Payday
[2] T2|P1|BUY:Favorable Cultural Opinion|FROM:P1|COST:4
[3] T3|P0|BUY:Travel Wallet|FROM:P0|COST:3
[3] T3|P0|REV|S9:Background Check
[4] T4|P1|STEAL:Ticket|SKIP_NEXT
[5] T5|P0|STEAL:Passport|SKIP_NEXT
[6] T6|P1|SKIP_TURN
[7] T7|P0|SKIP_TURN
[8] T8|P1|SELL:Favorable Cultural Opinion|GAIN:2
[8] T8|P1|PAY_FEE:1|TO:P0
[8] T8|P1|BUY:Background Check|FROM:P0|COST:4
[9] T9|P0|ACT:Payday
[9] T9|PAYDAY|SALARIES:[1,1]
[10] T10|P1|STEAL:Passport|SKIP_NEXT
[10] T10|P1|TICKET_PASSPORT_BONUS|GAIN:1A
[11] T11|P0|ACT:Rummage Sale
[11] T11|P0|ACT:Rummage Sale|GAIN:3|NO_DOCS
[11] T11|P0|REV|S3:Payday
[12] T12|P1|SKIP_TURN
[13] T13|P0|ACT:Pandemic / Economic Stimulus
[13] T13|ROLL_D6:1
[13] T13|P0|ACT:PANDEMIC_STIMULUS|DELTA:[-1,-1]
[13] T13|P0|REV|S7:Get Engaged to a Native
[13] T13|P0|REV|S8:Attend Security Training
[14] T14|P1|ACT:Mental Fog
[14] T14|P1|ACT:Mental Fog|LOSS:1
[14] T14|P1|REV|S7:Travel Concierge
[14] T14|P1|REV|S8:Physical Exam
[15] T15|P0|PAY_FEE:1|TO:P1
[15] T15|P0|DISC:Travel Concierge|FROM:P1|GAIN:2
[16] T16|P1|ACT:Swap Wallets
[16] T16|P1|ACT:Swap Wallets|SWAP:P0
[16] T16|P1|REV|S9:Payday
[16] T16|P1|REV|S10:Support Group Motivates You
[17] T17|P0|ACT:Payday
[17] T17|PAYDAY|SALARIES:[1,1]
[18] T18|P1|BUY:Support Group Motivates You|FROM:P1|COST:2
[19] T19|P0|PAY_FEE:2|TO:P1
[19] T19|P0|DISC:Physical Exam|FROM:P1|GAIN:2
[20] T20|P1|PAY_FEE:2|TO:P0
[20] T20|P1|DISC:Attend Security Training|FROM:P0|GAIN:2
[21] T21|P0|ACT:Payday
[21] T21|PAYDAY|SALARIES:[1,1]
[21] T21|P0|REV|S2:Learn Song from Your Destination
[22] T22|P1|ACT:Payday
[22] T22|PAYDAY|SALARIES:[1,1]
[22] T22|P1|REV|S0:Cookies for Neighbor from Destination
[23] T23|P0|BUY:Learn Song from Your Destination|FROM:P0|COST:2
[24] T24|P1|BUY:Cookies for Neighbor from Destination|FROM:P1|COST:2
[25] T25|P0|STEAL:Ticket|SKIP_NEXT
[25] T25|P0|TICKET_PASSPORT_BONUS|GAIN:1A
[26] T26|P1|ACT:Payday
[26] T26|PAYDAY|SALARIES:[1,1]
[27] T27|P0|SKIP_TURN
[28] T28|P1|ACT:Insider
[28] T28|P1|KEEP:Insider
[28] T28|P1|REV|S3:Vehicle Registration Papers
[29] T29|P0|PAY_FEE:3|TO:P1
[29] T29|P0|DISC:Residence Address in Destination|FROM:P1|GAIN:2
[29] T29|P1|REV|S1:Stellar Reputation
[29] T29|P1|REV|S2:Attend History Class
[30] T30|P1|ACT:Stellar Reputation
[30] T30|P1|KEEP:Stellar Reputation
[31] T31|P0|PAY_FEE:4|TO:P1
[31] T31|P0|DISC:Attend History Class|FROM:P1|GAIN:2
[32] T32|P1|PAY_FEE:3|TO:P0
[32] T32|P1|DISC:Get Engaged to a Native|FROM:P0|GAIN:2
[33] T33|P0|ACT:Island Paradise
[33] T33|P0|ACT:Island Paradise|DELTA:[2,1]
[33] T33|P0|REV|S0:Payday
[33] T33|P0|REV|S1:Pandemic / Economic Stimulus
[34] T34|P1|DISC:Vehicle Registration Papers|FROM:P1|GAIN:2
[35] T35|P0|ACT:Pandemic / Economic Stimulus
[35] T35|ROLL_D6:3
[35] T35|P0|ACT:PANDEMIC_STIMULUS|DELTA:[3,3]
[36] T36|ROLL_D6:6
[36] T36|P1|COLLEGE_APP|ROLL:6|TUITION:12|RES:PASS
[37] T37|P0|ACT:Payday
[37] T37|PAYDAY|SALARIES:[1,0]
[37] PHASE2_START
[37] PHASE2|P0|TRADE|$10:+3A|PEN_D:-3A|TOTAL_A:1
[37] PHASE2|P1|TRADE|$6:+2A|PEN_D:-2A|TOTAL_A:1
[37] PHASE2|P1|SELECT_LANE:Lane 1|TKN:7
[37] PHASE2|P1|CROSS:FAIL_LOW_A
[37] PHASE2|P0|SELECT_LANE:Lane 1|TKN:7
[37] PHASE2|P0|CROSS:FAIL_LOW_A
[37] GAME_OVER|WINNER (no one crossed, most Money): Player 1 ($1)

[1] INIT|P0|NAT:Bosnian|DEST:China|$2|FACEUP:[4:Payday,5:Favorable Cultural Opinion,6:Certificate of Excellence,11:Reward,12:Salvage,13:Pandemic / Economic Stimulus]
[1] INIT|P1|NAT:Chinese|DEST:Democratic Republic of Congo|$6|FACEUP:[4:Payday,5:Payday,6:Learn from an Elder,11:Coffee with Airport Employee,12:Personality Test,13:Pet Passport]
[1] INIT|P2|NAT:Congolese|DEST:France|$2|FACEUP:[4:Language Phrasebook,5:Subscribe to Travel Updates,6:Language Classes,11:Blacklisted,12:Insider,13:Suspect]
[1] T1|P0|PAY_FEE:1|TO:P1
[1] T1|P0|DISC:Coffee with Airport Employee|FROM:P1|GAIN:2
[1] T1|P1|REV|S7:Nostalgia
[2] T2|P1|BUY:Personality Test|FROM:P1|COST:3
[2] T2|P1|REV|S8:Letter of Invitation
[3] T3|P2|PAY_FEE:1|TO:P1
[3] T3|P2|DISC:Letter of Invitation|FROM:P1|GAIN:2
[4] T4|ROLL_D6:3
[4] T4|P0|COLLEGE_APP|ROLL:3|TUITION:4|RES:FAIL
[4] T4|P0|ACT:Salvage
[4] T4|P0|ACT:Salvage|GAIN:1|KEEP
[5] T5|P1|SELL:Personality Test|GAIN:2
[5] T5|Player 1 gains $1 from Salvage.
[5] T5|P1|BUY:Pet Passport|FROM:P1|COST:4
[5] T5|P1|REV|S9:Internship in Your Destination
[5] T5|P1|REV|S10:Payday
[6] T6|ROLL_D6:2
[6] T6|P2|COLLEGE_APP|ROLL:2|TUITION:3|RES:PASS
[7] T7|ROLL_D6:1
[7] T7|P0|COLLEGE_APP|ROLL:1|TUITION:2|RES:PASS
[8] T8|P1|SELL:Pet Passport|GAIN:2
[8] T8|Player 1 gains $1 from Salvage.
[8] T8|P1|BUY:Internship in Your Destination|FROM:P1|COST:4
[9] T9|ROLL_D6:6
[9] T9|P2|GRAD|ROLL:6|RES:FAIL
[9] T9|ROLL_D6:2
[9] T9|P2|GRAD|ROLL:2|RES:PASS|SALARY_INC:1
[9] T9|Player 1 gains $1 from Salvage.
[9] T9|P2|ACT:Blacklisted
[9] T9|P2|ACT:Blacklisted|LOSS:1|KEEP
[9] T9|P2|REV|S7:Employment Contract
[10] T10|ROLL_D6:5
[10] T10|P0|GRAD|ROLL:5|RES:FAIL
[10] T10|ROLL_D6:3
[10] T10|P0|GRAD|ROLL:3|RES:PASS|SALARY_INC:1
[10] T10|ROLL_D6:6
[10] T10|P0|COLLEGE_APP|ROLL:6|TUITION:8|RES:FAIL
[10] T10|P0|ACT:Pandemic / Economic Stimulus
[10] T10|ROLL_D6:6
[10] T10|P0|ACT:PANDEMIC_STIMULUS|DELTA:[-3,-1,0]
[10] T10|P0|REV|S9:Travel Concierge
[10] T10|P0|REV|S10:Dinner with a Diplomat
[11] T11|P1|STEAL:Ticket|SKIP_NEXT
[12] T12|Player 1 gains $1 from Salvage.
[12] T12|P2|BLACKLISTED|LOSS:1
[12] T12|P2|ACT:Suspect
[12] T12|P2|ACT:Suspect|LOSS:1
[12] T12|P2|ACT:Suspect|NOTHING_TO_LOSE
[12] T12|P2|REV|S10:Vehicle Registration Papers
[13] T13|P0|ACT:Reward
[13] T13|P0|ACT:Reward|DELTA:[1,0,0]
[13] T13|P0|REV|S7:Payday
[13] T13|P0|REV|S8:Payday
[14] T14|P1|SKIP_TURN
[15] T15|Player 1 gains $1 from Salvage.
[15] T15|P2|BLACKLISTED|LOSS:1
[15] T15|P2|ACT:Insider
[15] T15|P2|KEEP:Insider
[15] T15|P2|REV|S8:Payday
[15] T15|P2|REV|S9:Pandemic / Economic Stimulus
[16] T16|P0|ACT:Payday
[16] T16|PAYDAY|SALARIES:[2,1,3]
[17] T17|P1|PAY_FEE:1|TO:P2
[17] T17|P1|DISC:Vehicle Registration Papers|FROM:P2|GAIN:2
[17] T17|Player 1 gains $1 from Salvage.
[18] T18|P2|BUY:Employment Contract|FROM:P2|COST:4
[19] T19|P0|BUY:Dinner with a Diplomat|FROM:P0|COST:3
[20] T20|Player 1 gains $1 from Salvage.
[20] T20|P1|ACT:Nostalgia
[20] T20|P1|ACT:Nostalgia|GAIN:2
[21] T21|Player 1 gains $1 from Salvage.
[21] T21|P2|BLACKLISTED|LOSS:1
[21] T21|P2|ACT:Payday
[21] T21|PAYDAY|SALARIES:[2,1,3]
[22] T22|P0|STEAL:Ticket|SKIP_NEXT
[23] T23|P1|PAY_FEE:2|TO:P2
[23] T23|P1|DISC:Language Phrasebook|FROM:P2|GAIN:2
[23] T23|Player 1 gains $1 from Salvage.
[23] T23|P2|REV|S0:FOMO
[24] T24|P2|STEAL:Passport|SKIP_NEXT
[25] T25|P0|SKIP_TURN
[26] T26|Player 1 gains $1 from Salvage.
[26] T26|P1|ACT:Payday
[26] T26|PAYDAY|SALARIES:[2,1,3]
[27] T27|P2|SKIP_TURN
[28] T28|P0|ACT:Payday
[28] T28|PAYDAY|SALARIES:[2,1,3]
[29] T29|Player 1 gains $1 from Salvage.
[29] T29|P1|ACT:Payday
[29] T29|PAYDAY|SALARIES:[2,1,3]
[30] T30|P2|PAY_FEE:2|TO:P1
[30] T30|P2|BUY:Learn from an Elder|FROM:P1|COST:3
[30] T30|P1|REV|S2:Background Check
[30] T30|P1|REV|S3:Lost & Found
[31] T31|P0|PAY_FEE:2|TO:P1
[31] T31|P0|BUY:Background Check|FROM:P1|COST:4
[32] T32|Player 1 gains $1 from Salvage.
[32] T32|P1|ACT:Lost & Found
[32] T32|P1|ACT:Lost & Found|TAKE:MONEY:2|FROM:P0
[33] T33|P2|STEAL:Ticket|SKIP_NEXT
[33] T33|P2|TICKET_PASSPORT_BONUS|GAIN:1A
[34] T34|P0|STEAL:Passport|SKIP_NEXT
[34] T34|P0|TICKET_PASSPORT_BONUS|GAIN:1A
[35] T35|Player 1 gains $1 from Salvage.
[35] T35|P1|ACT:Payday
[35] T35|PAYDAY|SALARIES:[2,1,3]
[35] T35|P1|REV|S0:Camping
[35] T35|P1|REV|S1:Friend moves to your Destination
[36] T36|P2|SKIP_TURN
[37] T37|P0|SKIP_TURN
[38] T38|P1|BUY:Friend moves to your Destination|FROM:P1|COST:2
[39] T39|Player 1 gains $1 from Salvage.
[39] T39|P2|BLACKLISTED|LOSS:1
[39] T39|P2|ACT:FOMO
[39] T39|P2|ACT:FOMO|LOSS:1
[40] T40|P0|ACT:Payday
[40] T40|PAYDAY|SALARIES:[2,1,3]
[40] T40|P0|REV|S0:Payday
[41] T41|Player 1 gains $1 from Salvage.
[41] T41|P1|ACT:Camping
[41] T41|P1|ACT:Camping|DELTA:[1,1,1]
[42] T42|Player 1 gains $1 from Salvage.
[42] T42|P2|BLACKLISTED|LOSS:1
[42] T42|P2|ACT:Pandemic / Economic Stimulus
[42] T42|ROLL_D6:4
[42] T42|P2|ACT:PANDEMIC_STIMULUS|DELTA:[4,4,4]
[43] T43|P0|ACT:Payday
[43] T43|PAYDAY|SALARIES:[2,1,3]
[44] T44|P1|PAY_FEE:3|TO:P2
[44] T44|P1|BUY:Subscribe to Travel Updates|FROM:P2|COST:2
[44] T44|P2|REV|S1:Payday
[45] T45|Player 1 gains $1 from Salvage.
[45] T45|P2|BLACKLISTED|LOSS:1
[45] T45|P2|ACT:Payday
[45] T45|PAYDAY|SALARIES:[2,1,3]
[46] T46|P0|PAY_FEE:3|TO:P2
[46] T46|P0|DISC:Language Classes|FROM:P2|GAIN:2
[46] T46|P2|REV|S2:Payday
[46] T46|P2|REV|S3:Payday
[47] T47|P1|STEAL:Passport|SKIP_NEXT
[47] T47|P1|TICKET_PASSPORT_BONUS|GAIN:1A
[48] T48|Player 1 gains $1 from Salvage.
[48] T48|P2|BLACKLISTED|LOSS:1
[48] T48|P2|ACT:Payday
[48] T48|PAYDAY|SALARIES:[2,1,3]
[49] T49|P0|DISC:Travel Concierge|FROM:P0|GAIN:2
[50] T50|P1|SKIP_TURN
[51] T51|Player 1 gains $1 from Salvage.
[51] T51|P2|BLACKLISTED|LOSS:1
[51] T51|P2|ACT:Payday
[51] T51|PAYDAY|SALARIES:[2,1,3]
[52] T52|P0|BUY:Certificate of Excellence|FROM:P0|COST:2
[52] T52|P0|REV|S3:Notebook
[53] T53|P1|PAY_FEE:4|TO:P0
[53] T53|P1|DISC:Favorable Cultural Opinion|FROM:P0|GAIN:2
[53] T53|Player 1 gains $1 from Salvage.
[53] T53|P0|REV|S1:Learn Song from Your Destination
[53] T53|P0|REV|S2:Mental Fog
[54] T54|P2|PAY_FEE:3|TO:P0
[54] T54|P2|DISC:Learn Song from Your Destination|FROM:P0|GAIN:2
[54] T54|Player 1 gains $1 from Salvage.
[54] T54|P2|BLACKLISTED|LOSS:1
[55] T55|P0|ACT:Mental Fog
[55] T55|P0|ACT:Mental Fog|LOSS:1
[56] T56|P1|PAY_FEE:5|TO:P0
[56] T56|P1|DISC:Notebook|FROM:P0|GAIN:2
[56] T56|Player 1 gains $1 from Salvage.
[56] PHASE2_START
[56] PHASE2|P0|TRADE|$40:+12A|TOTAL_A:15
[56] PHASE2|P1|TRADE|$12:+4A|PEN_D:-2A|TOTAL_A:3
[56] PHASE2|P2|TRADE|$24:+6A|PEN_D:-3A|TOTAL_A:6
[56] PHASE2|P2|SELECT_LANE:Lane 1|TKN:7
[56] PHASE2|P2|CROSS:FAIL_LOW_A
[56] PHASE2|P0|SELECT_LANE:Lane 1|TKN:6
[56] PHASE2|P0|CROSS:PASS|PAID_A:6|REM_A:9
[56] PHASE2|P1|SELECT_LANE:Lane 5|TKN:9
[56] PHASE2|P1|CROSS:FAIL_LOW_A
[56] GAME_OVER|WINNER: Player 1 (Assurance: 9, Money: $6)

[1] INIT|P0|NAT:Bosnian|DEST:China|$2|FACEUP:[4:Endorsement from Royalty,5:Payday,6:Notebook,11:Get Engaged to a Native,12:Attend Security Training,13:Pet Passport]
[1] INIT|P1|NAT:Chinese|DEST:Democratic Republic of Congo|$6|FACEUP:[4:Video Chat with Person from Destination,5:Payday,6:Payday,11:Language Classes,12:Certificate of Excellence,13:Become World Famous]
[1] INIT|P2|NAT:Congolese|DEST:France|$2|FACEUP:[4:Payday,5:Employment Contract,6:Payday,11:Pandemic / Economic Stimulus,12:Attend History Class,13:Reward]
[1] T1|P0|PAY_FEE:1|TO:P1
[1] T1|P0|DISC:Become World Famous|FROM:P1|GAIN:2
[1] T1|P1|REV|S10:Pandemic / Economic Stimulus
[2] T2|P1|BUY:Certificate of Excellence|FROM:P1|COST:2
[2] T2|P1|REV|S9:FOMO
[3] T3|P2|PAY_FEE:1|TO:P1
[3] T3|P2|DISC:Language Classes|FROM:P1|GAIN:2
[3] T3|P1|REV|S7:Payday
[3] T3|P1|REV|S8:Insider
[4] T4|P0|BUY:Attend Security Training|FROM:P0|COST:3
[5] T5|P1|PAY_FEE:1|TO:P2
[5] T5|P1|BUY:Attend History Class|FROM:P2|COST:4
[6] T6|ROLL_D6:5
[6] T6|P2|COLLEGE_APP|ROLL:5|TUITION:7|RES:FAIL
[6] T6|P2|PAY_FEE:2|TO:P0
[6] T6|P2|DISC:Get Engaged to a Native|FROM:P0|GAIN:2
[6] T6|P0|REV|S7:Payday
[6] T6|P0|REV|S8:Payday
[7] T7|P0|STEAL:Passport|SKIP_NEXT
[8] T8|P1|STEAL:Passport|SKIP_NEXT
[9] T9|P2|ACT:Reward
[9] T9|P2|ACT:Reward|DELTA:[-1,-1,3]
[9] T9|P2|REV|S9:Internship in Your Destination
[9] T9|P2|REV|S10:Payday
[10] T10|P0|SKIP_TURN
[11] T11|P1|SKIP_TURN
[12] T12|P2|BUY:Internship in Your Destination|FROM:P2|COST:4
[13] T13|P0|ACT:Payday
[13] T13|PAYDAY|SALARIES:[1,1,1]
[14] T14|P1|STEAL:Ticket|SKIP_NEXT
[14] T14|P1|TICKET_PASSPORT_BONUS|GAIN:1A
[15] T15|P2|STEAL:Ticket|SKIP_NEXT
[16] T16|P0|ACT:Payday
[16] T16|PAYDAY|SALARIES:[1,1,1]
[17] T17|P1|SKIP_TURN
[18] T18|P2|SKIP_TURN
[19] T19|P0|BUY:Endorsement from Royalty|FROM:P0|COST:3
[19] T19|P0|REV|S0:Payday
[20] T20|P1|ACT:Pandemic / Economic Stimulus
[20] T20|ROLL_D6:4
[20] T20|P1|ACT:PANDEMIC_STIMULUS|DELTA:[0,-2,-4]
[21] T21|P2|ACT:Payday
[21] T21|PAYDAY|SALARIES:[1,1,1]
[22] T22|P0|STEAL:Ticket|SKIP_NEXT
[22] T22|P0|TICKET_PASSPORT_BONUS|GAIN:1A
[23] T23|P1|ACT:Insider
[23] T23|P1|KEEP:Insider
[24] T24|P2|ACT:Payday
[24] T24|PAYDAY|SALARIES:[1,2,1]
[24] T24|P2|REV|S3:Blacklisted
[25] T25|P0|SKIP_TURN
[26] T26|P1|PAY_FEE:2|TO:P0
[26] T26|P1|DISC:Pet Passport|FROM:P0|GAIN:2
[26] T26|P0|REV|S9:Payday
[26] T26|P0|REV|S10:Mental Fog
[27] T27|P2|ACT:Blacklisted
[27] T27|P2|ACT:Blacklisted|LOSS:1|KEEP
[28] T28|P0|ACT:Mental Fog
[28] T28|P0|ACT:Mental Fog|LOSS:1
[29] T29|P1|ACT:FOMO
[29] T29|P1|ACT:FOMO|LOSS:1
[30] T30|P2|BLACKLISTED|LOSS:1
[30] T30|P2|ACT:Pandemic / Economic Stimulus
[30] T30|ROLL_D6:2
[30] T30|P2|ACT:PANDEMIC_STIMULUS|DELTA:[2,2,2]
[30] T30|P2|REV|S7:Payday
[30] T30|P2|REV|S8:Camping
[31] T31|P0|ACT:Payday
[31] T31|PAYDAY|SALARIES:[1,2,1]
[32] T32|P1|ACT:Payday
[32] T32|PAYDAY|SALARIES:[1,2,1]
[33] T33|P2|SELL:Internship in Your Destination|GAIN:2
[33] T33|P2|BLACKLISTED|LOSS:1
[33] T33|P2|PAY_FEE:3|TO:P0
[33] T33|P2|BUY:Notebook|FROM:P0|COST:2
[33] T33|P0|REV|S3:Favorable Cultural Opinion
[34] T34|P0|PAY_FEE:2|TO:P1
[34] T34|P0|DISC:Video Chat with Person from Destination|FROM:P1|GAIN:2
[34] T34|P1|REV|S0:Nostalgia
[35] T35|P1|ACT:Nostalgia
[35] T35|P1|ACT:Nostalgia|GAIN:2
[36] T36|P2|STEAL:Passport|SKIP_NEXT
[36] T36|P2|TICKET_PASSPORT_BONUS|GAIN:1A
[37] T37|P0|ACT:Payday
[37] T37|PAYDAY|SALARIES:[1,2,1]
[38] T38|P1|ACT:Payday
[38] T38|PAYDAY|SALARIES:[1,2,1]
[38] T38|P1|REV|S1:Vehicle Registration Papers
[39] T39|P2|SKIP_TURN
[40] T40|P0|ACT:Payday
[40] T40|PAYDAY|SALARIES:[1,2,1]
[40] T40|P0|REV|S1:Lost & Found
[40] T40|P0|REV|S2:Checklist
[41] T41|P1|ACT:Payday
[41] T41|PAYDAY|SALARIES:[1,2,1]
[41] T41|P1|REV|S2:Salvage
[41] T41|P1|REV|S3:International Driving Permit
[42] T42|P2|BLACKLISTED|LOSS:1
[42] T42|P2|ACT:Camping
[42] T42|P2|ACT:Camping|DELTA:[0,0,2]
[43] T43|P0|BUY:Checklist|FROM:P0|COST:2
[44] T44|P1|ACT:Salvage
[44] T44|P1|ACT:Salvage|GAIN:1|KEEP
[45] T45|Player 2 gains $1 from Salvage.
[45] T45|P2|BLACKLISTED|LOSS:1
[45] T45|P2|ACT:Payday
[45] T45|PAYDAY|SALARIES:[1,2,1]
[46] T46|Player 2 gains $1 from Salvage.
[46] T46|P0|ACT:Lost & Found
[46] T46|P0|ACT:Lost & Found|TAKE:MONEY:2|FROM:P1
[47] T47|P1|PAY_FEE:3|TO:P0
[47] T47|P1|DISC:Favorable Cultural Opinion|FROM:P0|GAIN:2
[48] T48|Player 2 gains $1 from Salvage.
[48] T48|P2|BLACKLISTED|LOSS:1
[48] T48|P2|ACT:Payday
[48] T48|PAYDAY|SALARIES:[1,2,1]
[48] T48|P2|REV|S0:Suspect
[49] T49|P0|PAY_FEE:3|TO:P2
[49] T49|P0|DISC:Employment Contract|FROM:P2|GAIN:2
[49] T49|Player 2 gains $1 from Salvage.
[49] T49|P2|REV|S1:Enter Luxury Travel Club
[49] T49|P2|REV|S2:Language Phrasebook
[50] T50|P1|PAY_FEE:4|TO:P2
[50] T50|P1|DISC:Language Phrasebook|FROM:P2|GAIN:2
[51] T51|Player 2 gains $1 from Salvage.
[51] T51|P2|BLACKLISTED|LOSS:1
[51] T51|P2|ACT:Suspect
[51] T51|P2|ACT:Suspect|LOSS:1
[51] T51|P2|ACT:Suspect|DISC:Notebook
[51] T51|Player 2 gains $1 from Salvage.
[51] T51|P2|BLACKLISTED|LOSS:1
[52] T52|P0|PAY_FEE:4|TO:P2
[52] T52|P0|DISC:Enter Luxury Travel Club|FROM:P2|GAIN:2
[52] T52|Player 2 gains $1 from Salvage.
[53] T53|P1|DISC:International Driving Permit|FROM:P1|GAIN:2
[54] T54|P2|PAY_FEE:4|TO:P1
[54] T54|P2|DISC:Vehicle Registration Papers|FROM:P1|GAIN:2
[54] T54|Player 2 gains $1 from Salvage.
[54] T54|P2|BLACKLISTED|LOSS:1
[54] PHASE2_START
[54] PHASE2|P0|TRADE|$10:+3A|TOTAL_A:4
[54] PHASE2|P1|TRADE|$30:+10A|PEN_D:-2A|TOTAL_A:9
[54] PHASE2|P2|TRADE|$8:+2A|PEN_D:-3A|TOTAL_A:0
[54] PHASE2|P0|SELECT_LANE:Lane 4|TKN:9
[54] PHASE2|P0|CROSS:FAIL_LOW_A
[54] PHASE2|P1|SELECT_LANE:Lane 4|TKN:8
[54] PHASE2|P1|CROSS:PASS|PAID_A:8|REM_A:1
[54] PHASE2|P2|SELECT_LANE:Lane 4|TKN:4
[54] PHASE2|P2|CROSS:FAIL_LOW_A
[54] GAME_OVER|WINNER: Player 2 (Assurance: 1, Money: $4)

[1] INIT|P0|NAT:Bosnian|DEST:China|$2|FACEUP:[4:Cookies for Neighbor from Destination,5:Reward,6:Learn Song from Your Destination,11:Pet Passport,12:Payday,13:Stellar Reputation]
[1] INIT|P1|NAT:Chinese|DEST:Democratic Republic of Congo|$6|FACEUP:[4:Pandemic / Economic Stimulus,5:Language Phrasebook,6:Network Fair,11:Certificate of Excellence,12:Learn from an Elder,13:Checklist]
[1] INIT|P2|NAT:Congolese|DEST:France|$2|FACEUP:[4:Friend moves to your Destination,5:Write Last Will and Testament,6:Payday,11:Payday,12:Payday,13:Suspect]
[1] INIT|P3|NAT:French|DEST:Russia|$5|FACEUP:[4:Travel Wallet,5:Internship in Your Destination,6:Politician Approves You,11:International Driving Permit,12:Star Power,13:Blacklisted]
[1] T1|P0|ACT:Payday
[1] T1|PAYDAY|SALARIES:[1,1,1,1]
[2] T2|P1|BUY:Certificate of Excellence|FROM:P1|COST:2
[2] T2|P1|REV|S7:Rummage Sale
[3] T3|P2|PAY_FEE:1|TO:P1
[3] T3|P2|BUY:Checklist|FROM:P1|COST:2
[3] T3|P1|REV|S10:Payday
[4] T4|P3|BUY:International Driving Permit|FROM:P3|COST:4
[4] T4|P3|REV|S7:Island Paradise
[5] T5|P0|PAY_FEE:1|TO:P1
[5] T5|P0|DISC:Learn from an Elder|FROM:P1|GAIN:2
[5] T5|P1|REV|S8:Vehicle Registration Papers
[5] T5|P1|REV|S9:Excellent Teamwork
[6] T6|P1|BUY:Excellent Teamwork|FROM:P1|COST:3
[7] T7|P2|STEAL:Passport|SKIP_NEXT
[8] T8|P3|STEAL:Passport|SKIP_NEXT
[9] T9|P0|BUY:Pet Passport|FROM:P0|COST:4
[9] T9|P0|REV|S7:Payday
[9] T9|P0|REV|S8:Swap Wallets
[10] T10|P1|SELL:Certificate of Excellence|GAIN:2
[10] T10|P1|BUY:Vehicle Registration Papers|FROM:P1|COST:4
[11] T11|P2|SKIP_TURN
[12] T12|P3|SKIP_TURN
[13] T13|P0|STEAL:Passport|SKIP_NEXT
[14] T14|P1|SELL:Vehicle Registration Papers|GAIN:2
[14] T14|P1|BUY:Language Phrasebook|FROM:P1|COST:4
[15] T15|P2|ACT:Payday
[15] T15|PAYDAY|SALARIES:[1,1,1,1]
[16] T16|P3|ACT:Blacklisted
[16] T16|P3|ACT:Blacklisted|LOSS:1|KEEP
[16] T16|P3|REV|S10:Coffee with Airport Employee
[17] T17|P0|SKIP_TURN
[18] T18|P1|SELL:Excellent Teamwork|GAIN:2
[18] T18|P1|PAY_FEE:1|TO:P3
[18] T18|P1|BUY:Coffee with Airport Employee|FROM:P3|COST:2
[19] T19|P2|ACT:Payday
[19] T19|PAYDAY|SALARIES:[1,1,1,1]
[19] T19|P2|REV|S7:Payday
[19] T19|P2|REV|S8:Residence Address in Destination
[20] T20|P3|PAY_FEE:1|TO:P2
[20] T20|P3|DISC:Residence Address in Destination|FROM:P2|GAIN:2
[20] T20|P3|BLACKLISTED|LOSS:1
[21] T21|P0|ACT:Payday
[21] T21|PAYDAY|SALARIES:[1,1,1,1]
[22] T22|P1|STEAL:Passport|SKIP_NEXT
[23] T23|P2|ACT:Suspect
[23] T23|P2|ACT:Suspect|LOSS:1
[23] T23|P2|ACT:Suspect|DISC:Checklist
[23] T23|P2|REV|S9:Underdog
[23] T23|P2|REV|S10:Payday
[24] T24|P3|BLACKLISTED|LOSS:1
[24] T24|P3|ACT:Island Paradise
[24] T24|P3|ACT:Island Paradise|DELTA:[0,0,1,1]
[25] T25|P0|ACT:Stellar Reputation
[25] T25|P0|KEEP:Stellar Reputation
[25] T25|P0|REV|S9:Frontrunner
[25] T25|P0|REV|S10:Mental Fog
[26] T26|P1|SKIP_TURN
[27] T27|P2|ACT:Underdog
[27] T27|P2|ACT:Underdog|LOSS:1|KEEP
[27] T27|P2|UNDERDOG|LOSS:1|PASS_TO:P1
[28] T28|P3|PAY_FEE:2|TO:P2
[28] T28|P3|DISC:Write Last Will and Testament|FROM:P2|GAIN:2
[28] T28|P3|BLACKLISTED|LOSS:1
[29] T29|P0|ACT:Frontrunner
[29] T29|P0|ACT:Frontrunner|MONEY_PLACED:1|KEEP
[30] T30|P1|STEAL:Ticket|SKIP_NEXT
[30] T30|P1|TICKET_PASSPORT_BONUS|GAIN:1A
[31] T31|P2|ACT:Payday
[31] T31|PAYDAY|SALARIES:[1,1,1,1]
[31] T31|P0|FRONTRUNNER_ADD:1|TOTAL:2
[31] T31|P0|FRONTRUNNER_PASS|TO:P3
[31] T31|P3|FRONTRUNNER_ADD:1|TOTAL:3
[31] T31|P3|FRONTRUNNER_PASS|TO:P2
[32] T32|P3|BLACKLISTED|LOSS:1
[32] T32|P3|ACT:Star Power
[32] T32|P3|ACT:Star Power|GAIN:1|KEEP
[32] T32|P3|REV|S8:Payday
[32] T32|P3|REV|S9:Get Engaged to a Native
[33] T33|P0|PAY_FEE:2|TO:P3
[33] T33|P0|DISC:Get Engaged to a Native|FROM:P3|GAIN:2
[34] T34|P1|SKIP_TURN
[35] T35|P2|PAY_FEE:2|TO:P3
[35] T35|P2|DISC:Politician Approves You|FROM:P3|GAIN:2
[35] T35|P3|REV|S3:Vaccination Record
[36] T36|P3|BUY:Vaccination Record|FROM:P3|COST:3
[37] T37|P0|ACT:Mental Fog
[37] T37|P0|ACT:Mental Fog|LOSS:1
[38] T38|P1|PAY_FEE:2|TO:P0
[38] T38|P1|DISC:Learn Song from Your Destination|FROM:P0|GAIN:2
[38] T38|P0|REV|S3:Employment Contract
[39] T39|P2|ACT:Payday
[39] T39|PAYDAY|SALARIES:[1,1,1,1]
[39] T39|P2|FRONTRUNNER_ADD:1|TOTAL:4
[39] T39|P2|FRONTRUNNER_PASS|TO:P1
[39] T39|P2|REV|S2:Listen to the News
[39] T39|P2|REV|S3:Payday
[40] T40|P3|PAY_FEE:3|TO:P2
[40] T40|P3|BUY:Listen to the News|FROM:P2|COST:2
[41] T41|P0|ACT:Swap Wallets
[41] T41|P0|ACT:Swap Wallets|SWAP:P1
[42] T42|P1|ACT:Rummage Sale
[42] T42|P1|ACT:Rummage Sale|GAIN:3
[43] T43|P2|PAY_FEE:3|TO:P0
[43] T43|P2|BUY:Cookies for Neighbor from Destination|FROM:P0|COST:2
[43] T43|P3|STAR_POWER|GAIN:1|PASS_TO:P2
[43] T43|P0|REV|S0:Payday
[44] T44|P3|STEAL:Ticket|SKIP_NEXT
[44] T44|P3|TICKET_PASSPORT_BONUS|GAIN:1A
[45] T45|P0|ACT:Reward
[45] T45|P0|ACT:Reward|DELTA:[4,-1,-1,-1]
[45] T45|P0|REV|S1:Favorable Cultural Opinion
[45] T45|P0|REV|S2:Insider
[46] T46|P1|ACT:Pandemic / Economic Stimulus
[46] T46|ROLL_D6:2
[46] T46|P1|ACT:PANDEMIC_STIMULUS|DELTA:[-2,-2,-2,-2]
[46] T46|P1|REV|S0:Payday
[46] T46|P1|REV|S1:Enter Luxury Travel Club
[47] T47|P2|STEAL:Ticket|SKIP_NEXT
[47] T47|P2|TICKET_PASSPORT_BONUS|GAIN:1A
[48] T48|P3|SKIP_TURN
[49] T49|P0|BUY:Favorable Cultural Opinion|FROM:P0|COST:3
[49] T49|P2|STAR_POWER|GAIN:1|PASS_TO:P0
[50] T50|P1|ACT:Payday
[50] T50|PAYDAY|SALARIES:[1,1,1,1]
[50] T50|P1|FRONTRUNNER_ADD:1|TOTAL:5
[50] T50|P1|FRONTRUNNER_PASS|TO:P0
[51] T51|P2|SKIP_TURN
[52] T52|P3|BLACKLISTED|LOSS:1
[52] T52|P3|ACT:Payday
[52] T52|PAYDAY|SALARIES:[1,1,1,1]
[52] T52|P0|FRONTRUNNER_PASS|TO:P3
[52] T52|P3|FRONTRUNNER_PASS|TO:P2
[53] T53|P0|STEAL:Ticket|SKIP_NEXT
[53] T53|P0|TICKET_PASSPORT_BONUS|GAIN:1A
[54] T54|P1|ACT:Payday
[54] T54|PAYDAY|SALARIES:[1,1,1,1]
[54] T54|P2|FRONTRUNNER_PASS|TO:P1
[55] T55|P2|ACT:Payday
[55] T55|PAYDAY|SALARIES:[1,1,1,1]
[55] T55|P1|FRONTRUNNER_PASS|TO:P0
[56] T56|P3|DISC:Internship in Your Destination|FROM:P3|GAIN:2
[56] T56|P3|BLACKLISTED|LOSS:1
[56] T56|P3|REV|S2:Penalty
[57] T57|P0|SKIP_TURN
[58] T58|P1|PAY_FEE:3|TO:P0
[58] T58|P1|DISC:Employment Contract|FROM:P0|GAIN:2
[59] T59|P2|ACT:Payday
[59] T59|PAYDAY|SALARIES:[1,1,1,1]
[59] T59|P0|FRONTRUNNER_PASS|TO:P3
[59] T59|P3|FRONTRUNNER_PASS|TO:P2
[60] T60|P3|BLACKLISTED|LOSS:1
[60] T60|P3|ACT:Penalty
[60] T60|P3|ACT:Penalty|LOSS:1|KEEP
[61] T61|P0|ACT:Insider
[61] T61|P0|KEEP:Insider
[62] T62|P1|BUY:Network Fair|FROM:P1|COST:3
[62] T62|P0|STAR_POWER|GAIN:1|PASS_TO:P1
[62] T62|P1|REV|S2:Background Check
[62] T62|P1|REV|S3:Payday
[63] T63|P2|BUY:Friend moves to your Destination|FROM:P2|COST:2
[63] T63|P1|STAR_POWER|GAIN:1|PASS_TO:P2
[63] T63|P2|REV|S0:Pandemic / Economic Stimulus
[63] T63|P2|REV|S1:Payday
[64] T64|P3|DISC:Travel Wallet|FROM:P3|GAIN:2
[64] T64|P3|BLACKLISTED|LOSS:1
[64] T64|P3|REV|S0:Personality Test
[64] T64|P3|REV|S1:Salvage
[65] T65|P0|ACT:Payday
[65] T65|PAYDAY|SALARIES:[2,1,1,1]
[65] T65|P2|FRONTRUNNER_PASS|TO:P1
[66] T66|P1|ACT:Payday
[66] T66|PAYDAY|SALARIES:[2,1,1,1]
[66] T66|P1|FRONTRUNNER_PASS|TO:P0
[67] T67|P2|ACT:Pandemic / Economic Stimulus
[67] T67|ROLL_D6:3
[67] T67|P2|ACT:PANDEMIC_STIMULUS|DELTA:[3,3,3,3]
[68] T68|P3|BLACKLISTED|LOSS:1
[68] T68|P3|ACT:Salvage
[68] T68|P3|ACT:Salvage|GAIN:1|KEEP
[69] T69|P0|PAY_FEE:3|TO:P1
[69] T69|P0|DISC:Background Check|FROM:P1|GAIN:2
[69] T69|Player 4 gains $1 from Salvage.
[70] T70|P1|PAY_FEE:4|TO:P3
[70] T70|P1|DISC:Personality Test|FROM:P3|GAIN:2
[70] T70|Player 4 gains $1 from Salvage.
[71] T71|Player 4 gains $1 from Salvage.
[71] T71|P2|ACT:Payday
[71] T71|PAYDAY|SALARIES:[2,1,1,1]
[71] T71|P0|FRONTRUNNER_PASS|TO:P3
[71] T71|P3|FRONTRUNNER_PASS|TO:P2
[72] T72|P3|PAY_FEE:4|TO:P1
[72] T72|P3|DISC:Enter Luxury Travel Club|FROM:P1|GAIN:2
[72] T72|P3|BLACKLISTED|LOSS:1
[72] PHASE2_START
[72] PHASE2|P0|TRADE|$20:+6A|PEN_D:-3A|TOTAL_A:4
[72] PHASE2|P1|TRADE|$18:+6A|PEN_D:-2A|TOTAL_A:5
[72] PHASE2|P2|TRADE|$16:+4A|PEN_D:-3A|TOTAL_A:2
[72] PHASE2|P3|TRADE|$14:+4A|TOTAL_A:5
[72] PHASE2|P0|SELECT_LANE:Lane 4|TKN:9
[72] PHASE2|P0|CROSS:FAIL_LOW_A
[72] PHASE2|P1|SELECT_LANE:Lane 4|TKN:8
[72] PHASE2|P1|CROSS:FAIL_LOW_A
[72] PHASE2|P2|SELECT_LANE:Lane 4|TKN:4
[72] PHASE2|P2|CROSS:FAIL_LOW_A
[72] PHASE2|P3|SELECT_LANE:Lane 3|TKN:5
[72] PHASE2|P3|CROSS:PASS|PAID_A:5|REM_A:0
[72] GAME_OVER|WINNER: Player 4 (Assurance: 0, Money: $0)
