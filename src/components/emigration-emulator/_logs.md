[1] INIT|P0|NAT:Russian|DEST:Senegal|$5|FACEUP:[4:Trousers Fall Down,5:Shredder Accident,6:Pet Passport,11:Identical Twin,12:Politician Approves You,13:Payday]
[1] INIT|P1|NAT:English|DEST:Switzerland|$5|FACEUP:[4:Travel Brochure,5:Enter Luxury Travel Club,6:Life Coach,11:Travel Wallet,12:Vehicle Registration Papers,13:Payday]
[1] INIT|P2|NAT:Congolese|DEST:China|$2|FACEUP:[4:Payday,5:Payday,6:Payday,11:Frontrunner,12:Cookies for Neighbor from Destination,13:Fancy Clothes]
[1] INIT|P3|NAT:Chinese|DEST:England|$6|FACEUP:[4:VIP,5:Pandemic / Economic Stimulus,6:Subscribe to Travel Updates,11:Learn Song from Your Destination,12:Penalty,13:Internship in Your Destination]
[1] T1|P0|ACT:Identical Twin
[1] T1|P0|ACT:Identical Twin|GAIN:1|EXTRA_TURN
[1] T1|P0|REV|S7:Friend moves to your Destination
[1] T1|P0|BUY:Friend moves to your Destination|FROM:P0|COST:2
[2] T2|P1|BUY:Travel Wallet|FROM:P1|COST:3
[2] T2|P1|REV|S7:Payday
[3] T3|P2|BUY:Cookies for Neighbor from Destination|FROM:P2|COST:2
[4] T4|P3|BUY:Learn Song from Your Destination|FROM:P3|COST:2
[4] T4|P3|REV|S7:Checklist
[5] T5|P0|STEAL:Ticket|SKIP_NEXT
[6] T6|P1|SELL:Travel Wallet|GAIN:2
[6] T6|P1|PAY_FEE:1|TO:P3
[6] T6|P1|BUY:Checklist|FROM:P3|COST:2
[7] T7|P2|STEAL:Ticket|SKIP_NEXT
[8] T8|P3|STEAL:Ticket|SKIP_NEXT
[9] T9|P0|SKIP_TURN
[10] T10|P1|STEAL:Passport|SKIP_NEXT
[11] T11|P2|SKIP_TURN
[12] T12|P3|SKIP_TURN
[13] T13|P0|ACT:Payday
[13] T13|PAYDAY|SALARIES:[1,1,1,1]
[13] T13|P0|REV|S10:Payday
[14] T14|P1|SKIP_TURN
[15] T15|P2|PAY_FEE:1|TO:P3
[15] T15|P2|DISC:Internship in Your Destination|FROM:P3|GAIN:2
[15] T15|P3|REV|S10:Become World Famous
[16] T16|P3|SELL:Learn Song from Your Destination|GAIN:2
[16] T16|P3|PAY_FEE:1|TO:P1
[16] T16|P3|BUY:Vehicle Registration Papers|FROM:P1|COST:4
[16] T16|P1|REV|S8:Insider
[17] T17|P0|BUY:Politician Approves You|FROM:P0|COST:4
[17] T17|P0|REV|S8:Vaccination Record
[17] T17|P0|REV|S9:Listen to the News
[18] T18|P1|ACT:Payday
[18] T18|PAYDAY|SALARIES:[1,1,1,1]
[18] T18|P1|REV|S9:Social Butterfly
[18] T18|P1|REV|S10:Language Phrasebook
[19] T19|P2|PAY_FEE:2|TO:P0
[19] T19|P2|DISC:Listen to the News|FROM:P0|GAIN:2
[20] T20|P3|STEAL:Passport|SKIP_NEXT
[20] T20|P3|TICKET_PASSPORT_BONUS|GAIN:1A
[21] T21|P0|BUY:Vaccination Record|FROM:P0|COST:3
[22] T22|P1|ACT:Payday
[22] T22|PAYDAY|SALARIES:[1,1,1,1]
[23] T23|P2|ACT:Frontrunner
[23] T23|P2|ACT:Frontrunner|MONEY_PLACED:1|KEEP
[23] T23|P2|REV|S7:Employment Contract
[23] T23|P2|REV|S8:Payday
[24] T24|P3|SKIP_TURN
[25] T25|P0|PAY_FEE:1|TO:P1
[25] T25|P0|ACT:Insider
[25] T25|P0|KEEP:Insider
[26] T26|P1|PAY_FEE:2|TO:P3
[26] T26|P1|BUY:Become World Famous|FROM:P3|COST:3
[27] T27|P2|SELL:Cookies for Neighbor from Destination|GAIN:2
[27] T27|P2|BUY:Employment Contract|FROM:P2|COST:4
[28] T28|P3|PAY_FEE:2|TO:P1
[28] T28|P3|DISC:Language Phrasebook|FROM:P1|GAIN:2
[29] T29|P0|STEAL:Passport|SKIP_NEXT
[29] T29|P0|TICKET_PASSPORT_BONUS|GAIN:1A
[30] T30|P1|STEAL:Ticket|SKIP_NEXT
[30] T30|P1|TICKET_PASSPORT_BONUS|GAIN:1A
[31] T31|P2|STEAL:Passport|SKIP_NEXT
[31] T31|P2|TICKET_PASSPORT_BONUS|GAIN:1A
[32] T32|P3|ACT:Penalty
[32] T32|P3|ACT:Penalty|LOSS:1|KEEP
[32] T32|P3|REV|S8:Attend Security Training
[32] T32|P3|REV|S9:Star Power
[33] T33|P0|SKIP_TURN
[34] T34|P1|SKIP_TURN
[35] T35|P2|SKIP_TURN
[36] T36|P3|ACT:Star Power
[36] T36|P3|ACT:Star Power|GAIN:1|KEEP
[37] T37|P0|ACT:Payday
[37] T37|PAYDAY|SALARIES:[2,1,1,1]
[37] T37|P2|FRONTRUNNER_ADD:1|TOTAL:2
[37] T37|P2|FRONTRUNNER_PASS|TO:P1
[38] T38|P1|BUY:Travel Brochure|FROM:P1|COST:2
[38] T38|P1|REV|S0:Payday
[39] T39|P2|ACT:Payday
[39] T39|PAYDAY|SALARIES:[2,1,1,1]
[39] T39|P1|FRONTRUNNER_ADD:1|TOTAL:3
[39] T39|P1|FRONTRUNNER_PASS|TO:P0
[40] T40|P3|BUY:Subscribe to Travel Updates|FROM:P3|COST:2
[40] T40|P3|PASS_PENALTY|TO:P2
[40] T40|P3|REV|S3:Payday
[41] T41|P0|BUY:Pet Passport|FROM:P0|COST:4
[41] T41|P0|REV|S3:Get Engaged to a Native
[42] T42|P1|ACT:Payday
[42] T42|PAYDAY|SALARIES:[2,1,1,1]
[42] T42|P0|FRONTRUNNER_ADD:1|TOTAL:4
[42] T42|P0|FRONTRUNNER_PASS|TO:P3
[42] T42|P3|FRONTRUNNER_ADD:1|TOTAL:5
[42] T42|P3|FRONTRUNNER_PASS|TO:P2
[43] T43|P2|ACT:Payday
[43] T43|PAYDAY|SALARIES:[2,1,1,1]
[43] T43|P2|FRONTRUNNER_PASS|TO:P1
[43] T43|P2|REV|S0:Payday
[44] T44|P3|ACT:Payday
[44] T44|PAYDAY|SALARIES:[2,1,1,1]
[44] T44|P1|FRONTRUNNER_PASS|TO:P0
[45] T45|P0|BUY:Get Engaged to a Native|FROM:P0|COST:4
[45] T45|P3|STAR_POWER|GAIN:1|PASS_TO:P0
[46] T46|P1|PAY_FEE:3|TO:P3
[46] T46|P1|DISC:Attend Security Training|FROM:P3|GAIN:2
[47] T47|P2|ACT:Payday
[47] T47|PAYDAY|SALARIES:[2,1,1,1]
[47] T47|P0|FRONTRUNNER_PASS|TO:P3
[47] T47|P3|FRONTRUNNER_PASS|TO:P2
[48] T48|P3|ACT:VIP
[48] T48|P3|ACT:VIP|GAIN:8
[48] T48|P3|REV|S0:Copy of Birth Certificate
[49] T49|P0|PAY_FEE:2|TO:P1
[49] T49|P0|ACT:Social Butterfly
[49] T49|P0|ACT:Social Butterfly|TAKE:MONEY:3|FROM:P3
[50] T50|P1|PAY_FEE:4|TO:P3
[50] T50|P1|DISC:Copy of Birth Certificate|FROM:P3|GAIN:2
[51] T51|P2|PAY_FEE:3|TO:P1
[51] T51|P2|DISC:Enter Luxury Travel Club|FROM:P1|GAIN:2
[51] T51|P1|REV|S1:Mental Fog
[52] T52|P3|ACT:Pandemic / Economic Stimulus
[52] T52|ROLL_D6:4
[52] T52|P3|ACT:PANDEMIC_STIMULUS|DELTA:[-4,-4,-4,-4]
[52] T52|P3|REV|S1:Payday
[52] T52|P3|REV|S2:Payday
[53] ERR|NO_FUNDS_3
[53] T53|P0|ACT:Trousers Fall Down
[53] T53|P0|ACT:Trousers Fall Down|LOSS:3
[53] T53|P0|REV|S0:Video Chat with Person from Destination
[54] T54|P1|ACT:Life Coach
[54] T54|P1|ACT:Life Coach|GAIN_A:1
[54] T54|P1|REV|S2:Payday
[54] T54|P1|REV|S3:Pandemic / Economic Stimulus
[55] T55|P2|ACT:Fancy Clothes
[55] T55|P2|KEEP:Fancy Clothes
[55] T55|P2|REV|S9:Payday
[55] T55|P2|REV|S10:Underdog
[56] T56|P3|ACT:Payday
[56] T56|PAYDAY|SALARIES:[2,1,1,1]
[56] T56|P2|FRONTRUNNER_PASS|TO:P1
[57] T57|P0|DISC:Video Chat with Person from Destination|FROM:P0|GAIN:2
[58] T58|P1|ACT:Payday
[58] T58|PAYDAY|SALARIES:[2,1,1,1]
[58] T58|P1|FRONTRUNNER_PASS|TO:P0
[59] T59|P2|ACT:Payday
[59] T59|PAYDAY|SALARIES:[2,1,1,1]
[59] T59|P0|FRONTRUNNER_PASS|TO:P3
[59] T59|P3|FRONTRUNNER_PASS|TO:P2
[60] T60|P3|ACT:Payday
[60] T60|PAYDAY|SALARIES:[2,1,1,1]
[60] T60|P2|FRONTRUNNER_PASS|TO:P1
[61] T61|ROLL_D6:2
[61] T61|P0|COLLEGE_APP|ROLL:2|TUITION:4|RES:PASS
[62] T62|P1|ACT:Pandemic / Economic Stimulus
[62] T62|ROLL_D6:1
[62] T62|P1|ACT:PANDEMIC_STIMULUS|DELTA:[1,1,1,1]
[63] T63|P2|ACT:Payday
[63] T63|PAYDAY|SALARIES:[0,1,1,1]
[63] T63|P1|FRONTRUNNER_PASS|TO:P0
[63] T63|P2|REV|S1:Attend History Class
[64] T64|P3|PAY_FEE:3|TO:P2
[64] T64|P3|DISC:Attend History Class|FROM:P2|GAIN:2
[65] T65|ROLL_D6:1
[65] T65|P0|GRAD|ROLL:1|RES:PASS|SALARY_INC:1
[65] T65|ROLL_D6:4
[65] T65|P0|COLLEGE_APP|ROLL:4|TUITION:9|RES:FAIL
[65] T65|P0|PAY_FEE:3|TO:P1
[65] T65|P0|ACT:Mental Fog
[65] T65|P0|ACT:Mental Fog|LOSS:1
[65] T65|P0|ACT:Mental Fog|DISC_LAYOUT:Shredder Accident|FROM:P0
[65] T65|P0|REV|S1:Endorsement from Royalty
[65] T65|P0|REV|S2:Payday
[66] T66|P1|PAY_FEE:5|TO:P0
[66] T66|P1|DISC:Endorsement from Royalty|FROM:P0|GAIN:2
[67] T67|P2|ACT:Underdog
[67] T67|P2|ACT:Underdog|LOSS:1|KEEP
[67] T67|P2|UNDERDOG|LOSS:1|PASS_TO:P1
[68] T68|ROLL_D6:2
[68] T68|P3|COLLEGE_APP|ROLL:2|TUITION:5|RES:PASS
[69] T69|P0|ACT:Payday
[69] T69|PAYDAY|SALARIES:[3,1,1,0]
[69] T69|P0|FRONTRUNNER_PASS|TO:P3
[69] T69|P3|FRONTRUNNER_PASS|TO:P2
[70] T70|ROLL_D6:6
[70] T70|P1|COLLEGE_APP|ROLL:6|TUITION:11|RES:PASS
[71] T71|P2|ACT:Payday
[71] T71|PAYDAY|SALARIES:[2,0,1,0]
[71] T71|P2|FRONTRUNNER_PASS|TO:P1
[71] T71|P2|REV|S2:Residence Address in Destination
[71] T71|P2|REV|S3:Keep Calm
[72] T72|ROLL_D6:5
[72] T72|P3|GRAD|ROLL:5|RES:FAIL
[72] T72|ROLL_D6:6
[72] T72|P3|GRAD|ROLL:6|RES:FAIL
[72] T72|P3|PAY_FEE:4|TO:P2
[72] T72|P3|DISC:Residence Address in Destination|FROM:P2|GAIN:2
[73] T73|P0|PAY_FEE:4|TO:P2
[73] T73|P0|ACT:Keep Calm
[73] T73|P0|ACT:Keep Calm|GAIN:1|KEEP
[73] PHASE2_START
[73] PHASE2|P0|TRADE|$7:+2A|3C:+5A|TOTAL_A:10
[73] PHASE2|P1|TRADE|TOTAL_A:2
[73] PHASE2|P2|TRADE|$20:+6A|PEN_D:-3A|TOTAL_A:4
[73] PHASE2|P3|TRADE|$10:+3A|TOTAL_A:4
[73] PHASE2|P1|SELECT_LANE:Lane 1|TKN:7
[73] PHASE2|P1|CROSS:FAIL_LOW_A
[73] PHASE2|P2|SELECT_LANE:Lane 4|TKN:8
[73] PHASE2|P2|CROSS:FAIL_LOW_A
[73] PHASE2|P3|SELECT_LANE:Lane 4|TKN:9
[73] PHASE2|P3|CROSS:FAIL_LOW_A
[73] PHASE2|P0|SELECT_LANE:Lane 4|TKN:4
[73] PHASE2|P0|CROSS:PASS|PAID_A:4|REM_A:6
[73] GAME_OVER|WINNER: Player 1 (Assurance: 6, Money: $2)

[1] INIT|P0|NAT:American|DEST:Democratic Republic of Congo|$6|FACEUP:[4:Network Fair,5:Internship in Your Destination,6:Language Classes,11:Travel Concierge,12:Payday,13:Physical Exam]
[1] INIT|P1|NAT:Chinese|DEST:England|$6|FACEUP:[4:Vehicle Registration Papers,5:Lost & Found,6:Write Last Will and Testament,11:Attend Security Training,12:Payday,13:Payday]
[1] INIT|P2|NAT:Bosnian|DEST:Switzerland|$2|FACEUP:[4:Copy of Birth Certificate,5:Star Power,6:Payday,11:Underdog,12:Listen to the News,13:Payday]
[1] INIT|P3|NAT:Congolese|DEST:Bosnia and Herzegovina|$2|FACEUP:[4:Letter of Invitation,5:Payday,6:Pay Cut,11:Penalty,12:Learn Song from Your Destination,13:Frontrunner]
[1] T1|P0|PAY_FEE:1|TO:P2
[1] T1|P0|BUY:Listen to the News|FROM:P2|COST:2
[2] T2|P1|BUY:Attend Security Training|FROM:P1|COST:3
[2] T2|P1|REV|S7:Payday
[3] T3|P2|PAY_FEE:1|TO:P3
[3] T3|P2|BUY:Learn Song from Your Destination|FROM:P3|COST:2
[4] T4|P3|PAY_FEE:1|TO:P0
[4] T4|P3|DISC:Physical Exam|FROM:P0|GAIN:2
[4] T4|P0|REV|S10:Dinner with a Diplomat
[5] T5|P0|SELL:Listen to the News|GAIN:2
[5] T5|P0|BUY:Dinner with a Diplomat|FROM:P0|COST:3
[6] T6|P1|STEAL:Passport|SKIP_NEXT
[7] T7|P2|STEAL:Ticket|SKIP_NEXT
[8] T8|ROLL_D6:1
[8] T8|P3|COLLEGE_APP|ROLL:1|TUITION:2|RES:PASS
[9] T9|P0|STEAL:Ticket|SKIP_NEXT
[10] T10|P1|SKIP_TURN
[11] T11|P2|SKIP_TURN
[12] T12|ROLL_D6:6
[12] T12|P3|GRAD|ROLL:6|RES:FAIL
[12] T12|ROLL_D6:2
[12] T12|P3|GRAD|ROLL:2|RES:PASS|SALARY_INC:1
[12] T12|ROLL_D6:1
[12] T12|P3|COLLEGE_APP|ROLL:1|TUITION:2|RES:PASS
[13] T13|P0|SKIP_TURN
[14] T14|P1|ACT:Payday
[14] T14|PAYDAY|SALARIES:[1,1,1,0]
[15] T15|P2|ACT:Payday
[15] T15|PAYDAY|SALARIES:[1,1,1,0]
[15] T15|P2|REV|S9:Friend moves to your Destination
[15] T15|P2|REV|S10:Payday
[16] T16|ROLL_D6:6
[16] T16|P3|GRAD|ROLL:6|RES:FAIL
[16] T16|ROLL_D6:2
[16] T16|P3|GRAD|ROLL:2|RES:PASS|SALARY_INC:3
[16] T16|P3|ACT:Penalty
[16] T16|P3|ACT:Penalty|LOSS:1|KEEP
[16] T16|P3|REV|S7:Payday
[16] T16|P3|REV|S8:Island Paradise
[17] T17|P0|ACT:Payday
[17] T17|PAYDAY|SALARIES:[1,1,1,1]
[17] T17|P0|REV|S9:Payday
[18] T18|P1|PAY_FEE:1|TO:P2
[18] T18|P1|BUY:Friend moves to your Destination|FROM:P2|COST:2
[19] T19|P2|ACT:Payday
[19] T19|PAYDAY|SALARIES:[1,1,1,1]
[20] T20|P3|ACT:Payday
[20] T20|PAYDAY|SALARIES:[1,1,1,5]
[21] T21|P0|ACT:Payday
[21] T21|PAYDAY|SALARIES:[1,1,1,1]
[22] T22|P1|STEAL:Ticket|SKIP_NEXT
[22] T22|P1|TICKET_PASSPORT_BONUS|GAIN:1A
[23] T23|P2|ACT:Payday
[23] T23|PAYDAY|SALARIES:[1,1,1,1]
[23] T23|P2|REV|S3:Payday
[24] T24|P3|PAY_FEE:2|TO:P0
[24] T24|P3|BUY:Language Classes|FROM:P0|COST:3
[24] T24|P0|REV|S3:Philanthropy
[25] T25|P0|ACT:Philanthropy
[25] T25|P0|ACT:Philanthropy|DELTA:[-4,1,1,1]
[26] T26|P1|SKIP_TURN
[27] T27|P2|ACT:Payday
[27] T27|PAYDAY|SALARIES:[1,1,1,1]
[28] T28|P3|STEAL:Ticket|SKIP_NEXT
[29] T29|P0|PAY_FEE:2|TO:P3
[29] T29|P0|ACT:Frontrunner
[29] T29|P0|ACT:Frontrunner|MONEY_PLACED:1|KEEP
[29] T29|P3|REV|S9:Residence Address in Destination
[29] T29|P3|REV|S10:FOMO
[30] T30|P1|ACT:Payday
[30] T30|PAYDAY|SALARIES:[1,1,1,1]
[30] T30|P0|FRONTRUNNER_ADD:1|TOTAL:2
[30] T30|P0|FRONTRUNNER_PASS|TO:P3
[30] T30|P3|FRONTRUNNER_ADD:1|TOTAL:3
[30] T30|P3|FRONTRUNNER_PASS|TO:P2
[30] T30|P1|REV|S10:Stellar Reputation
[31] T31|P2|PAY_FEE:2|TO:P3
[31] T31|P2|BUY:Residence Address in Destination|FROM:P3|COST:3
[32] T32|P3|SKIP_TURN
[33] T33|P0|PAY_FEE:3|TO:P3
[33] T33|P0|ACT:Island Paradise
[33] T33|P0|ACT:Island Paradise|DELTA:[2,0,0,1]
[34] T34|P1|ACT:Payday
[34] T34|PAYDAY|SALARIES:[1,1,1,1]
[34] T34|P2|FRONTRUNNER_ADD:1|TOTAL:4
[34] T34|P2|FRONTRUNNER_PASS|TO:P1
[34] T34|P1|REV|S8:Travel Wallet
[34] T34|P1|REV|S9:Payday
[35] T35|P2|STEAL:Passport|SKIP_NEXT
[35] T35|P2|TICKET_PASSPORT_BONUS|GAIN:1A
[36] T36|P3|ACT:Payday
[36] T36|PAYDAY|SALARIES:[1,1,1,5]
[36] T36|P1|FRONTRUNNER_ADD:1|TOTAL:5
[36] T36|P1|FRONTRUNNER_PASS|TO:P0
[37] T37|P0|PAY_FEE:4|TO:P1
[37] T37|P0|BUY:Travel Wallet|FROM:P1|COST:3
[38] T38|P1|ACT:Payday
[38] T38|PAYDAY|SALARIES:[1,1,1,1]
[38] T38|P0|FRONTRUNNER_PASS|TO:P3
[38] T38|P3|FRONTRUNNER_PASS|TO:P2
[39] T39|P2|SKIP_TURN
[40] T40|P3|BUY:Letter of Invitation|FROM:P3|COST:4
[40] T40|P3|PASS_PENALTY|TO:P2
[40] T40|P3|REV|S0:Bailout
[40] T40|P3|REV|S1:Politician Approves You
[41] T41|P0|STEAL:Passport|SKIP_NEXT
[41] T41|P0|TICKET_PASSPORT_BONUS|GAIN:1A
[42] T42|P1|PAY_FEE:2|TO:P0
[42] T42|P1|DISC:Travel Concierge|FROM:P0|GAIN:2
[42] T42|P0|REV|S7:Certificate of Excellence
[42] T42|P0|REV|S8:Video Chat with Person from Destination
[43] T43|P2|ACT:Underdog
[43] T43|P2|ACT:Underdog|LOSS:1|KEEP
[43] T43|P2|UNDERDOG|LOSS:1|PASS_TO:P1
[43] T43|P2|REV|S7:Payday
[43] T43|P2|REV|S8:Checklist
[44] T44|P3|STEAL:Passport|SKIP_NEXT
[44] T44|P3|TICKET_PASSPORT_BONUS|GAIN:1A
[45] T45|P0|SKIP_TURN
[46] T46|P1|ACT:Lost & Found
[46] T46|P1|ACT:Lost & Found|TAKE:MONEY:2|FROM:P0
[47] T47|P2|ACT:Payday
[47] T47|PAYDAY|SALARIES:[1,1,1,1]
[47] T47|P2|FRONTRUNNER_PASS|TO:P1
[48] T48|P3|SKIP_TURN
[49] T49|P0|BUY:Video Chat with Person from Destination|FROM:P0|COST:2
[50] T50|P1|PAY_FEE:3|TO:P0
[50] T50|P1|DISC:Certificate of Excellence|FROM:P0|GAIN:2
[51] T51|P2|BUY:Checklist|FROM:P2|COST:2
[51] T51|P2|PASS_PENALTY|TO:P1
[52] T52|P3|PAY_FEE:3|TO:P0
[52] T52|P3|DISC:Internship in Your Destination|FROM:P0|GAIN:2
[52] T52|P0|REV|S2:Camping
[53] T53|P0|BUY:Network Fair|FROM:P0|COST:3
[53] T53|P0|REV|S0:Notebook
[53] T53|P0|REV|S1:Payday
[54] T54|P1|PAY_FEE:4|TO:P2
[54] T54|P1|DISC:Copy of Birth Certificate|FROM:P2|GAIN:2
[54] T54|P2|REV|S0:Enter Luxury Travel Club
[55] T55|P2|PAY_FEE:3|TO:P0
[55] T55|P2|DISC:Notebook|FROM:P0|GAIN:2
[56] T56|P3|ACT:FOMO
[56] T56|P3|ACT:FOMO|LOSS:1
[57] T57|P0|ACT:Payday
[57] T57|PAYDAY|SALARIES:[1,1,1,1]
[57] T57|P1|FRONTRUNNER_PASS|TO:P0
[58] T58|P1|ACT:Stellar Reputation
[58] T58|P1|KEEP:Stellar Reputation
[58] T58|P1|UNDERDOG|LOSS:1|PASS_TO:P0
[59] T59|P2|PAY_FEE:4|TO:P1
[59] T59|P2|DISC:Vehicle Registration Papers|FROM:P1|GAIN:2
[59] T59|P1|REV|S0:Nostalgia
[59] T59|P1|REV|S1:Employment Contract
[60] T60|P3|PAY_FEE:4|TO:P1
[60] T60|P3|DISC:Write Last Will and Testament|FROM:P1|GAIN:2
[60] T60|P1|REV|S2:Payday
[60] T60|P1|REV|S3:Payday
[61] T61|P0|ACT:Camping
[61] T61|P0|ACT:Camping|DELTA:[1,1,1,1]
[62] T62|P1|ACT:Payday
[62] T62|PAYDAY|SALARIES:[1,1,1,1]
[62] T62|P0|FRONTRUNNER_PASS|TO:P3
[62] T62|P3|FRONTRUNNER_PASS|TO:P2
[63] T63|P2|ACT:Star Power
[63] T63|P2|ACT:Star Power|GAIN:1|KEEP
[63] T63|P2|REV|S1:Rummage Sale
[63] T63|P2|REV|S2:Coffee with Airport Employee
[64] T64|P3|ACT:Bailout
[64] T64|P3|ACT:Bailout|DELTA:[1,0,1,1]
[65] T65|P0|PAY_FEE:5|TO:P1
[65] T65|P0|DISC:Employment Contract|FROM:P1|GAIN:2
[66] T66|P1|ACT:Payday
[66] T66|PAYDAY|SALARIES:[1,1,1,1]
[66] T66|P2|FRONTRUNNER_PASS|TO:P1
[67] T67|P2|ACT:Rummage Sale
[67] T67|P2|ACT:Rummage Sale|GAIN:3
[68] T68|P3|ACT:Pay Cut
[68] T68|P3|ACT:Pay Cut|LOSS:1|KEEP
[68] T68|P3|REV|S2:Swap Wallets
[68] T68|P3|REV|S3:Share
[69] T69|P0|PAY_FEE:5|TO:P3
[69] T69|P0|DISC:Politician Approves You|FROM:P3|GAIN:2
[70] T70|P1|ACT:Nostalgia
[70] T70|P1|ACT:Nostalgia|GAIN:2
[71] T71|P2|BUY:Coffee with Airport Employee|FROM:P2|COST:2
[72] T72|P3|ACT:Swap Wallets
[72] T72|P3|ACT:Swap Wallets|SWAP:P0
[73] T73|P0|PAY_FEE:5|TO:P2
[73] T73|P0|DISC:Enter Luxury Travel Club|FROM:P2|GAIN:2
[74] T74|P1|PAY_FEE:5|TO:P3
[74] T74|P1|ACT:Share
[74] T74|P1|ACT:Share|DELTA:[5,-15,5,5]
[74] PHASE2_START
[74] PHASE2|P0|TRADE|$24:+8A|3C:+6A|PEN_D:-2A|TOTAL_A:13
[74] PHASE2|P1|TRADE|$20:+6A|PEN_D:-3A|TOTAL_A:4
[74] PHASE2|P2|TRADE|$21:+6A|TOTAL_A:7
[74] PHASE2|P3|TRADE|$12:+4A|PEN_D:-2A|TOTAL_A:7
[74] PHASE2|P2|SELECT_LANE:Lane 1|TKN:7
[74] PHASE2|P2|CROSS:PASS|PAID_A:7|REM_A:0
[74] PHASE2|P3|SELECT_LANE:Lane 1|TKN:7
[74] PHASE2|P3|CROSS:PASS|PAID_A:7|REM_A:0
[74] PHASE2|P0|SELECT_LANE:Lane 1|TKN:6
[74] PHASE2|P0|CROSS:PASS|PAID_A:6|REM_A:7
[74] PHASE2|P1|SELECT_LANE:Lane 4|TKN:8
[74] PHASE2|P1|CROSS:FAIL_LOW_A
[74] GAME_OVER|WINNER: Player 1 (Assurance: 7, Money: $2)

[1] INIT|P0|NAT:Russian|DEST:Bosnia and Herzegovina|$5|FACEUP:[4:Productivity,5:Payday,6:Payday,11:Payday,12:Reward,13:Payday]
[1] INIT|P1|NAT:Swiss|DEST:Senegal|$4|FACEUP:[4:Physical Exam,5:Suspect,6:Excellent Teamwork,11:International Driving Permit,12:Pet Passport,13:Persuasion]
[1] T1|P0|PAY_FEE:1|TO:P1
[1] T1|P0|BUY:Pet Passport|FROM:P1|COST:4
[2] T2|P1|BUY:International Driving Permit|FROM:P1|COST:4
[2] T2|P1|REV|S7:Copy of Birth Certificate
[2] T2|P1|REV|S8:Blacklisted
[3] T3|P0|STEAL:Passport|SKIP_NEXT
[4] T4|P1|STEAL:Passport|SKIP_NEXT
[5] T5|P0|SKIP_TURN
[6] T6|P1|SKIP_TURN
[7] T7|P0|ACT:Payday
[7] T7|PAYDAY|SALARIES:[1,1]
[7] T7|P0|REV|S7:Notebook
[8] T8|P1|PAY_FEE:1|TO:P0
[8] T8|P1|DISC:Notebook|FROM:P0|GAIN:2
[9] T9|P0|ACT:Payday
[9] T9|PAYDAY|SALARIES:[1,1]
[9] T9|P0|REV|S10:Attend History Class
[10] T10|P1|SELL:International Driving Permit|GAIN:2
[10] T10|P1|PAY_FEE:2|TO:P0
[10] T10|P1|BUY:Attend History Class|FROM:P0|COST:4
[11] T11|P0|PAY_FEE:2|TO:P1
[11] T11|P0|DISC:Copy of Birth Certificate|FROM:P1|GAIN:2
[12] T12|P1|STEAL:Ticket|SKIP_NEXT
[12] T12|P1|TICKET_PASSPORT_BONUS|GAIN:1A
[13] T13|P0|ACT:Reward
[13] T13|P0|ACT:Reward|DELTA:[2,-1]
[13] T13|P0|REV|S8:Payday
[13] T13|P0|REV|S9:Politician Approves You
[14] T14|P1|SKIP_TURN
[15] T15|P0|BUY:Politician Approves You|FROM:P0|COST:4
[16] T16|P1|ACT:Persuasion
[16] T16|P1|ACT:Persuasion|GAIN:1|KEEP
[16] T16|P1|REV|S9:Payday
[16] T16|P1|REV|S10:Learn from an Elder
[17] T17|P0|STEAL:Ticket|SKIP_NEXT
[17] T17|P0|TICKET_PASSPORT_BONUS|GAIN:1A
[18] T18|P1|ACT:Payday
[18] T18|PAYDAY|SALARIES:[1,1]
[19] T19|P0|SKIP_TURN
[20] T20|P1|ACT:Blacklisted
[20] T20|P1|ACT:Blacklisted|LOSS:1|KEEP
[21] T21|P0|ACT:Payday
[21] T21|PAYDAY|SALARIES:[1,1]
[22] T22|P1|BLACKLISTED|LOSS:1
[22] T22|P1|ACT:Suspect
[22] T22|P1|ACT:Suspect|LOSS:1
[22] T22|P1|ACT:Suspect|DISC:Attend History Class
[22] T22|P1|BLACKLISTED|LOSS:1
[23] T23|P0|ACT:Payday
[23] T23|PAYDAY|SALARIES:[1,1]
[23] T23|P0|REV|S3:Letter of Invitation
[24] T24|P1|DISC:Physical Exam|FROM:P1|GAIN:2
[24] T24|P1|BLACKLISTED|LOSS:1
[24] T24|P1|REV|S0:Travel Concierge
[24] T24|P1|REV|S1:Residence Address in Destination
[25] T25|P0|ACT:Payday
[25] T25|PAYDAY|SALARIES:[1,1]
[25] T25|P0|REV|S2:Payday
[26] T26|P1|PAY_FEE:3|TO:P0
[26] T26|P1|DISC:Letter of Invitation|FROM:P0|GAIN:2
[26] T26|P1|BLACKLISTED|LOSS:1
[27] T27|P0|ACT:Payday
[27] T27|PAYDAY|SALARIES:[1,1]
[28] T28|P1|DISC:Travel Concierge|FROM:P1|GAIN:2
[28] T28|P1|BLACKLISTED|LOSS:1
[29] T29|P0|PERSUASION_DECLINED|FEE:6
[29] T29|P0|PAY_FEE:6|TO:P1
[29] T29|P0|DISC:Learn from an Elder|FROM:P1|GAIN:2
[30] T30|P1|BUY:Excellent Teamwork|FROM:P1|COST:3
[30] T30|P1|REV|S2:Salvage
[30] T30|P1|REV|S3:Tariffs
[31] T31|P0|ACT:Productivity
[31] T31|P0|ACT:Productivity|GAIN:1|FEE_DEC:1
[31] T31|P0|REV|S0:Get Engaged to a Native
[31] T31|P0|REV|S1:Boost
[32] T32|P1|BLACKLISTED|LOSS:1
[32] T32|P1|ACT:Salvage
[32] T32|P1|ACT:Salvage|GAIN:1|KEEP
[33] T33|P0|PERSUASION_DECLINED|FEE:6
[33] T33|P0|PAY_FEE:6|TO:P1
[33] T33|P0|DISC:Residence Address in Destination|FROM:P1|GAIN:2
[33] T33|Player 2 gains $1 from Salvage.
[34] T34|P1|PAY_FEE:4|TO:P0
[34] T34|P1|DISC:Get Engaged to a Native|FROM:P0|GAIN:2
[34] T34|P1|BLACKLISTED|LOSS:1
[35] T35|Player 2 gains $1 from Salvage.
[35] T35|P0|ACT:Boost
[35] T35|P0|ACT:Boost|GAIN:2|FROM_NAT_STARTING:P1
[36] T36|P1|BLACKLISTED|LOSS:1
[36] T36|P1|ACT:Tariffs
[36] T36|P1|ACT:Tariffs|LOSS:1|FEE_INC:1
[36] PHASE2_START
[36] PHASE2|P0|TRADE|$6:+2A|PEN_D:-2A|TOTAL_A:1
[36] PHASE2|P1|TRADE|$7:+2A|PEN_D:-2A|TOTAL_A:1
[36] PHASE2|P0|SELECT_LANE:Lane 1|TKN:7
[36] PHASE2|P0|CROSS:FAIL_LOW_A
[36] PHASE2|P1|SELECT_LANE:Lane 1|TKN:6
[36] PHASE2|P1|CROSS:FAIL_LOW_A
[36] GAME_OVER|WINNER (no one crossed, most Money): Player 1 ($4)

[1] INIT|P0|NAT:Senegalese|DEST:England|$3|FACEUP:[4:Dinner with a Diplomat,5:Become World Famous,6:Video Chat with Person from Destination,11:Payday,12:Physical Exam,13:Productivity]
[1] INIT|P1|NAT:Chinese|DEST:Senegal|$6|FACEUP:[4:Payday,5:International Driving Permit,6:Pet Passport,11:Letter of Invitation,12:Payday,13:Payday]
[1] T1|P0|BUY:Physical Exam|FROM:P0|COST:3
[2] T2|P1|BUY:Letter of Invitation|FROM:P1|COST:4
[2] T2|P1|REV|S7:Identical Twin
[3] T3|P0|STEAL:Passport|SKIP_NEXT
[4] T4|P1|STEAL:Passport|SKIP_NEXT
[5] T5|P0|SKIP_TURN
[6] T6|P1|SKIP_TURN
[7] T7|P0|ACT:Payday
[7] T7|PAYDAY|SALARIES:[1,1]
[7] T7|P0|REV|S7:Payday
[7] T7|P0|REV|S8:Travel Brochure
[8] T8|P1|ACT:Payday
[8] T8|PAYDAY|SALARIES:[1,1]
[8] T8|P1|REV|S8:Payday
[9] T9|P0|ACT:Payday
[9] T9|PAYDAY|SALARIES:[1,1]
[10] T10|P1|ACT:Payday
[10] T10|PAYDAY|SALARIES:[1,1]
[11] T11|P0|ACT:Productivity
[11] T11|P0|ACT:Productivity|GAIN:1|FEE_DEC:1
[11] T11|P0|REV|S9:Boost
[11] T11|P0|REV|S10:Get Engaged to a Native
[12] T12|P1|PAY_FEE:1|TO:P0
[12] T12|P1|BUY:Get Engaged to a Native|FROM:P0|COST:4
[13] T13|P0|BUY:Travel Brochure|FROM:P0|COST:2
[14] T14|P1|STEAL:Ticket|SKIP_NEXT
[14] T14|P1|TICKET_PASSPORT_BONUS|GAIN:1A
[15] T15|P0|SELL:Travel Brochure|GAIN:2
[15] T15|P0|BUY:Dinner with a Diplomat|FROM:P0|COST:3
[15] T15|P0|REV|S0:VIP
[16] T16|P1|SKIP_TURN
[17] T17|P0|STEAL:Ticket|SKIP_NEXT
[17] T17|P0|TICKET_PASSPORT_BONUS|GAIN:1A
[18] T18|P1|ACT:Payday
[18] T18|PAYDAY|SALARIES:[1,1]
[18] T18|P1|REV|S9:Personality Test
[18] T18|P1|REV|S10:Network Fair
[19] T19|P0|SKIP_TURN
[20] T20|P1|ACT:Identical Twin
[20] T20|P1|ACT:Identical Twin|GAIN:1|EXTRA_TURN
[20] T20|P1|ACT:Payday
[20] T20|PAYDAY|SALARIES:[1,1]
[20] T20|P1|REV|S0:Fancy Clothes
[21] T21|P0|DISC:Personality Test|FROM:P1|GAIN:2
[22] T22|P1|ACT:Fancy Clothes
[22] T22|P1|KEEP:Fancy Clothes
[23] T23|P0|DISC:International Driving Permit|FROM:P1|GAIN:2
[23] T23|P1|REV|S1:Payday
[24] T24|P1|ACT:Payday
[24] T24|PAYDAY|SALARIES:[1,1]
[25] T25|P0|DISC:Network Fair|FROM:P1|GAIN:2
[26] T26|P1|PAY_FEE:2|TO:P0
[26] T26|P1|ACT:Boost
[26] T26|P1|ACT:Boost|GAIN:1|FROM_NAT_STARTING:P0
[27] T27|P0|DISC:Pet Passport|FROM:P1|GAIN:2
[27] T27|P1|REV|S2:Persuasion
[27] T27|P1|REV|S3:Social Butterfly
[28] T28|P1|PAY_FEE:3|TO:P0
[28] T28|P1|DISC:Become World Famous|FROM:P0|GAIN:2
[28] T28|P0|REV|S1:Friend moves to your Destination
[29] T29|P0|ACT:Persuasion
[29] T29|P0|ACT:Persuasion|GAIN:1|KEEP
[30] T30|P1|ACT:Social Butterfly
[30] T30|P1|ACT:Social Butterfly|TAKE:MONEY:3|FROM:P0
[31] T31|P0|ACT:VIP
[31] T31|P0|ACT:VIP|GAIN:8
[32] T32|P1|PAY_FEE:4|TO:P0
[32] T32|P1|PERSUASION_ACC|FROM:P0
[33] T33|P0|BUY:Friend moves to your Destination|FROM:P0|COST:2
[34] T34|P1|FORFEIT|CONS:1
[35] T35|P0|BUY:Video Chat with Person from Destination|FROM:P0|COST:2
[35] T35|P0|REV|S2:Payday
[35] T35|P0|REV|S3:Tariffs
[36] T36|P1|FORFEIT|CONS:1
[37] T37|P0|ACT:Payday
[37] T37|PAYDAY|SALARIES:[1,1]
[38] T38|P1|FORFEIT|CONS:1
[39] T39|P0|ACT:Tariffs
[39] T39|P0|ACT:Tariffs|LOSS:1|FEE_INC:1
[39] PHASE2_START
[39] PHASE2|P0|TRADE|$20:+6A|3C:+4A|PEN_D:-3A|TOTAL_A:8
[39] PHASE2|P1|TRADE|PEN_D:-2A|TOTAL_A:-1
[39] PHASE2|P1|SELECT_LANE:Lane 1|TKN:7
[39] PHASE2|P1|CROSS:FAIL_LOW_A
[39] PHASE2|P0|SELECT_LANE:Lane 1|TKN:7
[39] PHASE2|P0|CROSS:PASS|PAID_A:7|REM_A:1
[39] GAME_OVER|WINNER: Player 1 (Assurance: 1, Money: $5)

[1] INIT|P0|NAT:Senegalese|DEST:Democratic Republic of Congo|$3|FACEUP:[4:Vaccination Record,5:Politician Approves You,6:Enter Luxury Travel Club,11:Payday,12:Life Coach,13:Payday]
[1] INIT|P1|NAT:Bosnian|DEST:Switzerland|$2|FACEUP:[4:Cookies for Neighbor from Destination,5:Payday,6:Become World Famous,11:Travel Wallet,12:International Driving Permit,13:Shredder Accident]
[1] INIT|P2|NAT:English|DEST:Senegal|$5|FACEUP:[4:Insider,5:Pandemic / Economic Stimulus,6:Background Check,11:Payday,12:Language Phrasebook,13:Listen to the News]
[1] INIT|P3|NAT:Chinese|DEST:Senegal|$6|FACEUP:[4:Penalty,5:Payday,6:Subscribe to Travel Updates,11:Learn Song from Your Destination,12:Residence Address in Destination,13:Salvage]
[1] INIT|P4|NAT:Swiss|DEST:Russia|$4|FACEUP:[4:Dinner with a Diplomat,5:Payday,6:Internship in Your Destination,11:Keep Calm,12:Vehicle Registration Papers,13:Payday]
[1] INIT|P5|NAT:American|DEST:Russia|$6|FACEUP:[4:Payday,5:Payday,6:Payday,11:Letter of Invitation,12:Personality Test,13:Favorable Cultural Opinion]
[1] T1|P0|PAY_FEE:1|TO:P3
[1] T1|P0|BUY:Learn Song from Your Destination|FROM:P3|COST:2
[1] T1|P3|REV|S7:Payday
[2] T2|P1|PAY_FEE:1|TO:P2
[2] T2|P1|DISC:Language Phrasebook|FROM:P2|GAIN:2
[3] T3|P2|BUY:Listen to the News|FROM:P2|COST:2
[3] T3|P2|REV|S9:Copy of Birth Certificate
[3] T3|P2|REV|S10:Blacklisted
[4] T4|P3|PAY_FEE:1|TO:P2
[4] T4|P3|BUY:Copy of Birth Certificate|FROM:P2|COST:2
[5] T5|P4|BUY:Vehicle Registration Papers|FROM:P4|COST:4
[6] T6|P5|BUY:Personality Test|FROM:P5|COST:3
[7] T7|P0|STEAL:Ticket|SKIP_NEXT
[8] T8|P1|BUY:Travel Wallet|FROM:P1|COST:3
[8] T8|P1|REV|S7:Payday
[9] T9|P2|PAY_FEE:1|TO:P3
[9] T9|P2|BUY:Residence Address in Destination|FROM:P3|COST:3
[9] T9|P3|REV|S8:Coffee with Airport Employee
[10] T10|P3|BUY:Coffee with Airport Employee|FROM:P3|COST:2
[11] T11|P4|STEAL:Passport|SKIP_NEXT
[12] T12|P5|STEAL:Passport|SKIP_NEXT
[13] T13|P0|SKIP_TURN
[14] T14|P1|STEAL:Passport|SKIP_NEXT
[15] T15|P2|STEAL:Passport|SKIP_NEXT
[16] T16|P3|STEAL:Passport|SKIP_NEXT
[17] T17|P4|SKIP_TURN
[18] T18|P5|SKIP_TURN
[19] T19|P0|ACT:Payday
[19] T19|PAYDAY|SALARIES:[1,1,1,1,1,1]
[19] T19|P0|REV|S10:Payday
[20] T20|P1|SKIP_TURN
[21] T21|P2|SKIP_TURN
[22] T22|P3|SKIP_TURN
[23] T23|P4|ACT:Payday
[23] T23|PAYDAY|SALARIES:[1,1,1,1,1,1]
[23] T23|P4|REV|S9:Get Engaged to a Native
[23] T23|P4|REV|S10:Identical Twin
[24] T24|P5|BUY:Favorable Cultural Opinion|FROM:P5|COST:4
[24] T24|P5|REV|S9:Fancy Clothes
[24] T24|P5|REV|S10:Payday
[25] T25|P0|ACT:Payday
[25] T25|PAYDAY|SALARIES:[1,1,1,1,1,1]
[26] T26|P1|ACT:Payday
[26] T26|PAYDAY|SALARIES:[1,1,1,1,1,1]
[27] T27|P2|STEAL:Ticket|SKIP_NEXT
[27] T27|P2|TICKET_PASSPORT_BONUS|GAIN:1A
[28] T28|P3|STEAL:Ticket|SKIP_NEXT
[28] T28|P3|TICKET_PASSPORT_BONUS|GAIN:1A
[29] T29|P4|BUY:Get Engaged to a Native|FROM:P4|COST:4
[30] T30|P5|STEAL:Ticket|SKIP_NEXT
[30] T30|P5|TICKET_PASSPORT_BONUS|GAIN:1A
[31] T31|P0|ACT:Payday
[31] T31|PAYDAY|SALARIES:[1,1,1,1,1,1]
[31] T31|P0|REV|S7:Write Last Will and Testament
[32] T32|P1|PAY_FEE:2|TO:P0
[32] T32|P1|DISC:Write Last Will and Testament|FROM:P0|GAIN:2
[33] T33|P2|SKIP_TURN
[34] T34|P3|SKIP_TURN
[35] T35|P4|STEAL:Ticket|SKIP_NEXT
[35] T35|P4|TICKET_PASSPORT_BONUS|GAIN:1A
[36] T36|P5|SKIP_TURN
[37] T37|P0|PAY_FEE:2|TO:P5
[37] T37|P0|BUY:Letter of Invitation|FROM:P5|COST:4
[37] T37|P5|REV|S7:Payday
[37] T37|P5|REV|S8:Attend Security Training
[38] T38|P1|ACT:Shredder Accident
[38] T38|P1|ACT:Shredder Accident|DISC:Travel Wallet
[38] T38|P1|REV|S10:Checklist
[39] T39|P2|ACT:Payday
[39] T39|PAYDAY|SALARIES:[1,1,1,1,1,1]
[39] T39|P2|REV|S7:Travel Brochure
[39] T39|P2|REV|S8:Star Power
[40] T40|P3|ACT:Payday
[40] T40|PAYDAY|SALARIES:[1,1,1,1,1,1]
[41] T41|P4|SKIP_TURN
[42] T42|P5|ACT:Payday
[42] T42|PAYDAY|SALARIES:[1,1,1,1,1,1]
[43] T43|P0|STEAL:Passport|SKIP_NEXT
[43] T43|P0|TICKET_PASSPORT_BONUS|GAIN:1A
[44] T44|P1|BUY:Checklist|FROM:P1|COST:2
[45] T45|P2|PAY_FEE:2|TO:P1
[45] T45|P2|DISC:International Driving Permit|FROM:P1|GAIN:2
[45] T45|P1|REV|S8:Social Butterfly
[45] T45|P1|REV|S9:Payday
[46] T46|P3|PAY_FEE:2|TO:P2
[46] T46|P3|DISC:Travel Brochure|FROM:P2|GAIN:2
[47] T47|P4|PAY_FEE:1|TO:P5
[47] T47|P4|DISC:Attend Security Training|FROM:P5|GAIN:2
[48] T48|P5|ACT:Payday
[48] T48|PAYDAY|SALARIES:[1,1,1,1,1,1]
[48] T48|P5|REV|S0:Payday
[49] T49|P0|SKIP_TURN
[50] T50|P1|ACT:Payday
[50] T50|PAYDAY|SALARIES:[1,1,1,1,1,1]
[51] T51|P2|ACT:Blacklisted
[51] T51|P2|ACT:Blacklisted|LOSS:1|KEEP
[52] T52|P3|ACT:Salvage
[52] T52|P3|ACT:Salvage|GAIN:1|KEEP
[52] T52|P3|REV|S9:Attend History Class
[52] T52|P3|REV|S10:Mental Fog
[53] T53|Player 4 gains $1 from Salvage.
[53] T53|P4|ACT:Identical Twin
[53] T53|P4|ACT:Identical Twin|GAIN:1|EXTRA_TURN
[53] T53|P4|PAY_FEE:2|TO:P2
[53] T53|P4|DISC:Background Check|FROM:P2|GAIN:2
[53] T53|Player 4 gains $1 from Salvage.
[53] T53|P2|REV|S3:FOMO
[54] T54|Player 4 gains $1 from Salvage.
[54] T54|P5|ACT:Payday
[54] T54|PAYDAY|SALARIES:[1,1,1,1,1,1]
[55] T55|Player 4 gains $1 from Salvage.
[55] T55|P0|ACT:Life Coach
[55] T55|P0|ACT:Life Coach|GAIN_A:1
[55] T55|P0|REV|S8:Nostalgia
[55] T55|P0|REV|S9:Network Fair
[56] T56|P1|BUY:Become World Famous|FROM:P1|COST:3
[56] T56|P1|REV|S3:Reward
[57] T57|Player 4 gains $1 from Salvage.
[57] T57|P2|BLACKLISTED|LOSS:1
[57] T57|P2|ACT:FOMO
[57] T57|P2|ACT:FOMO|LOSS:1
[58] T58|P3|ACT:Mental Fog
[58] T58|P3|ACT:Mental Fog|LOSS:1
[59] T59|Player 4 gains $1 from Salvage.
[59] T59|P4|ACT:Keep Calm
[59] T59|P4|ACT:Keep Calm|GAIN:1|KEEP
[59] T59|P4|REV|S7:VIP
[59] T59|P4|REV|S8:Employment Contract
[60] T60|Player 4 gains $1 from Salvage.
[60] T60|P5|ACT:Payday
[60] T60|PAYDAY|SALARIES:[1,1,1,1,1,1]
[61] T61|Player 4 gains $1 from Salvage.
[61] T61|P0|ACT:Nostalgia
[61] T61|P0|ACT:Nostalgia|GAIN:2
[62] T62|P1|STEAL:Ticket|SKIP_NEXT
[62] T62|P1|TICKET_PASSPORT_BONUS|GAIN:1A
[63] T63|Player 4 gains $1 from Salvage.
[63] T63|P2|BLACKLISTED|LOSS:1
[63] T63|P2|ACT:Star Power
[63] T63|P2|ACT:Star Power|GAIN:1|KEEP
[64] T64|P3|ACT:Penalty
[64] T64|P3|ACT:Penalty|LOSS:1|KEEP
[64] T64|P3|REV|S0:Payday
[65] T65|Player 4 gains $1 from Salvage.
[65] T65|P4|ACT:VIP
[65] T65|P4|ACT:VIP|GAIN:12
[66] T66|P5|PAY_FEE:1|TO:P4
[66] T66|P5|DISC:Employment Contract|FROM:P4|GAIN:2
[66] T66|Player 4 gains $1 from Salvage.
[67] T67|P0|PAY_FEE:3|TO:P4
[67] T67|P0|DISC:Dinner with a Diplomat|FROM:P4|GAIN:2
[67] T67|Player 4 gains $1 from Salvage.
[67] T67|P4|REV|S0:Payday
[68] T68|P1|SKIP_TURN
[69] T69|P2|PAY_FEE:3|TO:P4
[69] T69|P2|DISC:Internship in Your Destination|FROM:P4|GAIN:2
[69] T69|Player 4 gains $1 from Salvage.
[69] T69|P2|BLACKLISTED|LOSS:1
[69] T69|P4|REV|S3:Pet Passport
[70] T70|P3|ACT:Payday
[70] T70|PAYDAY|SALARIES:[1,1,1,1,1,1]
[71] T71|Player 4 gains $1 from Salvage.
[71] T71|P4|ACT:Payday
[71] T71|PAYDAY|SALARIES:[1,1,1,1,1,1]
[72] T72|P5|PAY_FEE:2|TO:P3
[72] T72|P5|DISC:Attend History Class|FROM:P3|GAIN:2
[72] T72|Player 4 gains $1 from Salvage.
[73] T73|P0|PAY_FEE:4|TO:P4
[73] T73|P0|DISC:Pet Passport|FROM:P4|GAIN:2
[73] T73|Player 4 gains $1 from Salvage.
[74] T74|P1|PAY_FEE:3|TO:P3
[74] T74|P1|DISC:Subscribe to Travel Updates|FROM:P3|GAIN:2
[74] T74|Player 4 gains $1 from Salvage.
[74] T74|P3|REV|S3:Friend moves to your Destination
[75] T75|P2|PAY_FEE:4|TO:P3
[75] T75|P2|DISC:Friend moves to your Destination|FROM:P3|GAIN:2
[75] T75|Player 4 gains $1 from Salvage.
[75] T75|P2|BLACKLISTED|LOSS:1
[76] T76|P3|ACT:Payday
[76] T76|PAYDAY|SALARIES:[1,1,1,1,1,1]
[76] T76|P3|REV|S1:Frontrunner
[76] T76|P3|REV|S2:Trousers Fall Down
[77] T77|Player 4 gains $1 from Salvage.
[77] T77|P4|ACT:Payday
[77] T77|PAYDAY|SALARIES:[1,1,1,1,1,1]
[77] T77|P4|REV|S1:Language Classes
[77] T77|P4|REV|S2:Payday
[78] T78|P5|PAY_FEE:3|TO:P4
[78] T78|P5|DISC:Language Classes|FROM:P4|GAIN:2
[78] T78|Player 4 gains $1 from Salvage.
[79] T79|P0|BUY:Network Fair|FROM:P0|COST:3
[79] T79|P2|STAR_POWER|GAIN:1|PASS_TO:P0
[80] T80|Player 4 gains $1 from Salvage.
[80] T80|P1|ACT:Social Butterfly
[80] T80|P1|ACT:Social Butterfly|TAKE:MONEY:3|FROM:P0
[81] T81|Player 4 gains $1 from Salvage.
[81] T81|P2|BLACKLISTED|LOSS:1
[81] T81|P2|ACT:Insider
[81] T81|P2|KEEP:Insider
[81] T81|P2|REV|S0:Payday
[82] T82|P3|PAY_FEE:3|TO:P1
[82] T82|P3|DISC:Cookies for Neighbor from Destination|FROM:P1|GAIN:2
[82] T82|P1|REV|S0:Underdog
[83] T83|Player 4 gains $1 from Salvage.
[83] T83|P4|ACT:Payday
[83] T83|PAYDAY|SALARIES:[1,1,2,1,1,1]
[84] T84|P5|PAY_FEE:4|TO:P0
[84] T84|P5|DISC:Enter Luxury Travel Club|FROM:P0|GAIN:2
[84] T84|Player 4 gains $1 from Salvage.
[84] T84|P0|REV|S3:Endorsement from Royalty
[85] T85|P0|BUY:Endorsement from Royalty|FROM:P0|COST:3
[86] T86|Player 4 gains $1 from Salvage.
[86] T86|P1|ACT:Payday
[86] T86|PAYDAY|SALARIES:[1,1,2,1,1,1]
[86] T86|P1|REV|S1:Notebook
[86] T86|P1|REV|S2:Payday
[87] T87|Player 4 gains $1 from Salvage.
[87] T87|P2|BLACKLISTED|LOSS:1
[87] T87|P2|ACT:Payday
[87] T87|PAYDAY|SALARIES:[1,1,2,1,1,1]
[88] T88|P3|PAY_FEE:4|TO:P0
[88] T88|P3|DISC:Vaccination Record|FROM:P0|GAIN:2
[88] T88|P0|REV|S0:Lost & Found
[89] T89|P4|PAY_FEE:3|TO:P0
[89] T89|P4|DISC:Politician Approves You|FROM:P0|GAIN:2
[89] T89|Player 4 gains $1 from Salvage.
[89] T89|P0|REV|S1:Payday
[89] T89|P0|REV|S2:Travel Concierge
[90] T90|Player 4 gains $1 from Salvage.
[90] T90|P5|ACT:Fancy Clothes
[90] T90|P5|KEEP:Fancy Clothes
[91] T91|Player 4 gains $1 from Salvage.
[91] T91|P0|ACT:Payday
[91] T91|PAYDAY|SALARIES:[1,1,2,1,1,1]
[92] T92|Player 4 gains $1 from Salvage.
[92] T92|P1|ACT:Payday
[92] T92|PAYDAY|SALARIES:[1,1,2,1,1,1]
[93] T93|Player 4 gains $1 from Salvage.
[93] T93|P2|BLACKLISTED|LOSS:1
[93] T93|P2|ACT:Pandemic / Economic Stimulus
[93] T93|ROLL_D6:4
[93] T93|P2|ACT:PANDEMIC_STIMULUS|DELTA:[-4,-4,-4,-4,-4,-4]
[93] T93|P2|REV|S1:Physical Exam
[93] T93|P2|REV|S2:Camping
[94] T94|P3|ACT:Frontrunner
[94] T94|P3|ACT:Frontrunner|MONEY_PLACED:1|KEEP
[95] T95|P4|PAY_FEE:4|TO:P0
[95] T95|P4|DISC:Travel Concierge|FROM:P0|GAIN:2
[95] T95|Player 4 gains $1 from Salvage.
[96] T96|Player 4 gains $1 from Salvage.
[96] T96|P5|ACT:Payday
[96] T96|PAYDAY|SALARIES:[1,1,2,1,1,1]
[96] T96|P3|FRONTRUNNER_ADD:1|TOTAL:2
[96] T96|P3|FRONTRUNNER_PASS|TO:P2
[96] T96|P5|REV|S1:Suspect
[97] T97|Player 4 gains $1 from Salvage.
[97] T97|P0|ACT:Lost & Found
[97] T97|P0|ACT:Lost & Found|TAKE:MONEY:2|FROM:P1
[98] T98|P1|BUY:Notebook|FROM:P1|COST:2
[99] T99|Player 4 gains $1 from Salvage.
[99] T99|P2|BLACKLISTED|LOSS:1
[99] T99|P2|ACT:Camping
[99] T99|P2|ACT:Camping|DELTA:[0,1,2,1,1,1]
[100] T100|P3|ACT:Trousers Fall Down
[100] T100|P3|ACT:Trousers Fall Down|LOSS:3
[101] T101|P4|PAY_FEE:5|TO:P2
[101] T101|P4|DISC:Physical Exam|FROM:P2|GAIN:2
[101] T101|Player 4 gains $1 from Salvage.
[102] T102|Player 4 gains $1 from Salvage.
[102] T102|P5|ACT:Payday
[102] T102|PAYDAY|SALARIES:[1,1,2,1,1,1]
[102] T102|P2|FRONTRUNNER_ADD:1|TOTAL:3
[102] T102|P2|FRONTRUNNER_PASS|TO:P1
[102] T102|P5|REV|S2:Support Group Motivates You
[102] T102|P5|REV|S3:Payday
[103] T103|P0|PAY_FEE:5|TO:P5
[103] T103|P0|DISC:Support Group Motivates You|FROM:P5|GAIN:2
[103] T103|Player 4 gains $1 from Salvage.
[104] T104|Player 4 gains $1 from Salvage.
[104] T104|P1|ACT:Underdog
[104] T104|P1|ACT:Underdog|LOSS:1|KEEP
[104] T104|P1|UNDERDOG|LOSS:1|PASS_TO:P0
[105] T105|P2|PAY_FEE:5|TO:P5
[105] T105|Player 4 gains $1 from Salvage.
[105] T105|P2|BLACKLISTED|LOSS:1
[105] T105|P2|ACT:Suspect
[105] T105|P2|ACT:Suspect|LOSS:1
[105] T105|P2|ACT:Suspect|DISC:Listen to the News
[105] T105|Player 4 gains $1 from Salvage.
[105] T105|P2|BLACKLISTED|LOSS:1
[106] T106|P3|PAY_FEE:5|TO:P1
[106] T106|P3|ACT:Reward
[106] T106|P3|ACT:Reward|DELTA:[-1,-1,-1,6,-1,-1]
[107] T107|ROLL_D6:1
[107] T107|P4|COLLEGE_APP|ROLL:1|TUITION:3|RES:PASS
[108] T108|Player 4 gains $1 from Salvage.
[108] T108|P5|ACT:Payday
[108] T108|PAYDAY|SALARIES:[1,1,2,1,0,1]
[108] T108|P1|FRONTRUNNER_ADD:1|TOTAL:4
[108] T108|P1|FRONTRUNNER_PASS|TO:P0
[108] PHASE2_START
[108] T108|Player 4 gains $1 from Salvage.
[108] T108|Player 4 gains $1 from Salvage.
[108] T108|Player 4 gains $1 from Salvage.
[108] PHASE2|P0|TRADE|$18:+6A|3C:+6A|PEN_D:-2A|TOTAL_A:12
[108] PHASE2|P1|TRADE|$21:+6A|TOTAL_A:7
[108] PHASE2|P2|TRADE|$14:+4A|PEN_D:-2A|TOTAL_A:3
[108] PHASE2|P3|TRADE|$70:+20A|PEN_D:-2A|TOTAL_A:19
[108] PHASE2|P4|TRADE|$35:+10A|PEN_D:-3A|TOTAL_A:8
[108] PHASE2|P5|TRADE|$28:+8A|PEN_D:-3A|TOTAL_A:6
[108] PHASE2|P0|SELECT_LANE:Lane 1|TKN:7
[108] PHASE2|P0|CROSS:PASS|PAID_A:7|REM_A:5
[108] PHASE2|P1|SELECT_LANE:Lane 1|TKN:6
[108] PHASE2|P1|CROSS:PASS|PAID_A:6|REM_A:1
[108] PHASE2|P2|SELECT_LANE:Lane 5|TKN:3
[108] PHASE2|P2|CROSS:PASS|PAID_A:3|REM_A:0
[108] PHASE2|P3|SELECT_LANE:Lane 1|TKN:7
[108] PHASE2|P3|CROSS:PASS|PAID_A:7|REM_A:12
[108] PHASE2|P4|SELECT_LANE:Lane 2|TKN:8
[108] PHASE2|P4|CROSS:PASS|PAID_A:8|REM_A:0
[108] PHASE2|P5|SELECT_LANE:Lane 2|TKN:7
[108] PHASE2|P5|CROSS:FAIL_LOW_A
[108] GAME_OVER|WINNER: Player 4 (Assurance: 12, Money: $2)

[1] INIT|P0|NAT:English|DEST:Senegal|$5|FACEUP:[4:Payday,5:Payday,6:Payday,11:VIP,12:Support Group Motivates You,13:Payday]
[1] INIT|P1|NAT:Bosnian|DEST:Switzerland|$2|FACEUP:[4:Suspect,5:Travel Brochure,6:Pandemic / Economic Stimulus,11:Share,12:Personality Test,13:Dinner with a Diplomat]
[1] INIT|P2|NAT:French|DEST:Bosnia and Herzegovina|$5|FACEUP:[4:Listen to the News,5:Employment Contract,6:Travel Concierge,11:Background Check,12:Video Chat with Person from Destination,13:Payday]
[1] INIT|P3|NAT:American|DEST:China|$6|FACEUP:[4:Payday,5:Philanthropy,6:Pay Cut,11:Payday,12:Learn from an Elder,13:Network Fair]
[1] INIT|P4|NAT:Chinese|DEST:Democratic Republic of Congo|$6|FACEUP:[4:Rummage Sale,5:International Driving Permit,6:Travel Wallet,11:Favorable Cultural Opinion,12:Residence Address in Destination,13:Politician Approves You]
[1] INIT|P5|NAT:Congolese|DEST:United States of America|$2|FACEUP:[4:Underdog,5:Swap Wallets,6:Identical Twin,11:Payday,12:Letter of Recommendation,13:Attend Security Training]
[1] T1|P0|BUY:Support Group Motivates You|FROM:P0|COST:2
[2] T2|P1|PAY_FEE:1|TO:P4
[2] T2|P1|DISC:Residence Address in Destination|FROM:P4|GAIN:2
[3] T3|P2|BUY:Video Chat with Person from Destination|FROM:P2|COST:2
[4] T4|P3|BUY:Network Fair|FROM:P3|COST:3
[4] T4|P3|REV|S10:Physical Exam
[5] T5|P4|BUY:Politician Approves You|FROM:P4|COST:4
[5] T5|P4|REV|S9:Get Engaged to a Native
[5] T5|P4|REV|S10:Payday
[6] T6|P5|ACT:Payday
[6] T6|PAYDAY|SALARIES:[1,1,1,1,1,1]
[6] T6|P5|REV|S7:Star Power
[7] T7|P0|PAY_FEE:1|TO:P5
[7] T7|P0|BUY:Letter of Recommendation|FROM:P5|COST:3
[7] T7|P5|REV|S8:Attend History Class
[8] T8|P1|BUY:Personality Test|FROM:P1|COST:3
[9] T9|P2|BUY:Background Check|FROM:P2|COST:4
[9] T9|P2|REV|S7:Copy of Birth Certificate
[9] T9|P2|REV|S8:Pet Passport
[10] T10|P3|STEAL:Ticket|SKIP_NEXT
[11] T11|P4|PAY_FEE:1|TO:P2
[11] T11|P4|BUY:Copy of Birth Certificate|FROM:P2|COST:2
[12] T12|P5|BUY:Attend Security Training|FROM:P5|COST:3
[12] T12|P5|REV|S9:Learn Song from Your Destination
[12] T12|P5|REV|S10:Payday
[13] T13|P0|STEAL:Ticket|SKIP_NEXT
[14] T14|P1|STEAL:Passport|SKIP_NEXT
[15] T15|P2|SELL:Video Chat with Person from Destination|GAIN:2
[15] T15|P2|PAY_FEE:1|TO:P5
[15] T15|P2|BUY:Learn Song from Your Destination|FROM:P5|COST:2
[16] T16|P3|SKIP_TURN
[17] T17|P4|STEAL:Ticket|SKIP_NEXT
[18] T18|P5|STEAL:Passport|SKIP_NEXT
[19] T19|P0|SKIP_TURN
[20] T20|P1|SKIP_TURN
[21] T21|P2|STEAL:Passport|SKIP_NEXT
[22] T22|P3|SELL:Network Fair|GAIN:2
[22] T22|P3|BUY:Physical Exam|FROM:P3|COST:3
[23] T23|P4|SKIP_TURN
[24] T24|P5|SKIP_TURN
[25] T25|P0|STEAL:Passport|SKIP_NEXT
[25] T25|P0|TICKET_PASSPORT_BONUS|GAIN:1A
[26] T26|P1|SELL:Personality Test|GAIN:2
[26] T26|P1|BUY:Dinner with a Diplomat|FROM:P1|COST:3
[26] T26|P1|REV|S9:Island Paradise
[26] T26|P1|REV|S10:Subscribe to Travel Updates
[27] T27|P2|SKIP_TURN
[28] T28|P3|STEAL:Passport|SKIP_NEXT
[28] T28|P3|TICKET_PASSPORT_BONUS|GAIN:1A
[29] T29|P4|STEAL:Passport|SKIP_NEXT
[29] T29|P4|TICKET_PASSPORT_BONUS|GAIN:1A
[30] T30|P5|ACT:Payday
[30] T30|PAYDAY|SALARIES:[1,1,1,1,1,1]
[31] T31|P0|SKIP_TURN
[32] T32|P1|STEAL:Ticket|SKIP_NEXT
[32] T32|P1|TICKET_PASSPORT_BONUS|GAIN:1A
[33] T33|P2|STEAL:Ticket|SKIP_NEXT
[33] T33|P2|TICKET_PASSPORT_BONUS|GAIN:1A
[34] T34|P3|SKIP_TURN
[35] T35|P4|SKIP_TURN
[36] T36|P5|PAY_FEE:1|TO:P2
[36] T36|P5|DISC:Pet Passport|FROM:P2|GAIN:2
[37] T37|P0|ACT:Payday
[37] T37|PAYDAY|SALARIES:[1,1,1,1,1,1]
[37] T37|P0|REV|S9:Fancy Clothes
[37] T37|P0|REV|S10:Payday
[38] T38|P1|SKIP_TURN
[39] T39|P2|SKIP_TURN
[40] T40|P3|ACT:Payday
[40] T40|PAYDAY|SALARIES:[1,1,1,1,1,1]
[40] T40|P3|REV|S7:Endorsement from Royalty
[41] T41|P4|ACT:Payday
[41] T41|PAYDAY|SALARIES:[1,1,1,1,1,1]
[42] T42|P5|BUY:Attend History Class|FROM:P5|COST:4
[43] T43|P0|ACT:Payday
[43] T43|PAYDAY|SALARIES:[1,1,1,1,1,1]
[44] T44|P1|BUY:Subscribe to Travel Updates|FROM:P1|COST:2
[45] T45|P2|ACT:Payday
[45] T45|PAYDAY|SALARIES:[1,1,1,1,1,1]
[45] T45|P2|REV|S9:Reward
[45] T45|P2|REV|S10:Coffee with Airport Employee
[46] T46|P3|PAY_FEE:1|TO:P4
[46] T46|P3|DISC:Favorable Cultural Opinion|FROM:P4|GAIN:2
[46] T46|P4|REV|S7:Payday
[46] T46|P4|REV|S8:Friend moves to your Destination
[47] T47|P4|ACT:Payday
[47] T47|PAYDAY|SALARIES:[1,1,1,1,1,1]
[48] T48|P5|STEAL:Ticket|SKIP_NEXT
[48] T48|P5|TICKET_PASSPORT_BONUS|GAIN:1A
[49] T49|P0|PAY_FEE:2|TO:P2
[49] T49|P0|DISC:Coffee with Airport Employee|FROM:P2|GAIN:2
[50] T50|P1|PAY_FEE:2|TO:P4
[50] T50|P1|DISC:Get Engaged to a Native|FROM:P4|GAIN:2
[51] T51|P2|BUY:Listen to the News|FROM:P2|COST:2
[51] T51|P2|REV|S0:Become World Famous
[52] T52|P3|PAY_FEE:2|TO:P4
[52] T52|P3|DISC:Travel Wallet|FROM:P4|GAIN:2
[52] T52|P4|REV|S3:Payday
[53] T53|P4|ACT:Payday
[53] T53|PAYDAY|SALARIES:[1,1,1,1,1,1]
[54] T54|P5|SKIP_TURN
[55] T55|P0|PAY_FEE:3|TO:P4
[55] T55|P0|DISC:Friend moves to your Destination|FROM:P4|GAIN:2
[56] T56|P1|PAY_FEE:3|TO:P4
[56] T56|P1|DISC:International Driving Permit|FROM:P4|GAIN:2
[56] T56|P4|REV|S2:Payday
[57] T57|P2|BUY:Become World Famous|FROM:P2|COST:3
[58] T58|P3|PAY_FEE:3|TO:P1
[58] T58|P3|ACT:Island Paradise
[58] T58|P3|ACT:Island Paradise|DELTA:[1,1,1,2,1,1]
[59] T59|P4|ACT:Payday
[59] T59|PAYDAY|SALARIES:[1,1,1,1,1,1]
[60] T60|P5|PAY_FEE:2|TO:P3
[60] T60|P5|DISC:Endorsement from Royalty|FROM:P3|GAIN:2
[61] T61|P0|ACT:VIP
[61] T61|P0|ACT:VIP|GAIN:11
[61] T61|P0|REV|S7:Penalty
[61] T61|P0|REV|S8:Payday
[62] T62|P1|ACT:Share
[62] T62|P1|ACT:Share|DELTA:[1,-5,1,1,1,1]
[62] T62|P1|REV|S7:Stellar Reputation
[62] T62|P1|REV|S8:Cookies for Neighbor from Destination
[63] T63|P2|PAY_FEE:2|TO:P1
[63] T63|P2|DISC:Cookies for Neighbor from Destination|FROM:P1|GAIN:2
[64] T64|P3|PAY_FEE:4|TO:P1
[64] T64|P3|DISC:Travel Brochure|FROM:P1|GAIN:2
[65] T65|P4|PAY_FEE:2|TO:P3
[65] T65|P4|DISC:Learn from an Elder|FROM:P3|GAIN:2
[65] T65|P3|REV|S8:Vehicle Registration Papers
[65] T65|P3|REV|S9:Social Butterfly
[66] T66|P5|ACT:Identical Twin
[66] T66|P5|ACT:Identical Twin|GAIN:1|EXTRA_TURN
[66] T66|P5|REV|S3:Payday
[66] T66|P5|ACT:Payday
[66] T66|PAYDAY|SALARIES:[1,1,1,1,1,1]
[67] T67|P0|ACT:Payday
[67] T67|PAYDAY|SALARIES:[1,1,1,1,1,1]
[68] T68|P1|ACT:Stellar Reputation
[68] T68|P1|KEEP:Stellar Reputation
[69] T69|P2|ACT:Reward
[69] T69|P2|ACT:Reward|DELTA:[-1,-1,6,-1,-1,-1]
[70] T70|P3|ACT:Social Butterfly
[70] T70|P3|ACT:Social Butterfly|TAKE:MONEY:3|FROM:P0
[71] T71|P4|PAY_FEE:3|TO:P2
[71] T71|P4|DISC:Employment Contract|FROM:P2|GAIN:2
[71] T71|P2|REV|S1:Write Last Will and Testament
[72] T72|P5|PAY_FEE:3|TO:P2
[72] T72|P5|DISC:Travel Concierge|FROM:P2|GAIN:2
[72] T72|P2|REV|S2:Excellent Teamwork
[72] T72|P2|REV|S3:Frontrunner
[73] T73|P0|ACT:Penalty
[73] T73|P0|ACT:Penalty|LOSS:1|KEEP
[74] T74|P1|ACT:Suspect
[74] T74|P1|ACT:Suspect|LOSS:1
[74] T74|P1|ACT:Suspect|DISC:Dinner with a Diplomat
[74] T74|P1|REV|S0:Mental Fog
[74] T74|P1|REV|S1:Bailout
[75] T75|P2|ACT:Frontrunner
[75] T75|P2|ACT:Frontrunner|MONEY_PLACED:1|KEEP
[76] T76|P3|ACT:Pay Cut
[76] T76|P3|ACT:Pay Cut|LOSS:1|KEEP
[76] T76|P3|REV|S3:Payday
[77] T77|P4|ACT:Rummage Sale
[77] T77|P4|ACT:Rummage Sale|GAIN:3
[77] T77|P4|REV|S0:Blacklisted
[77] T77|P4|REV|S1:Payday
[78] T78|P5|ACT:Swap Wallets
[78] T78|P5|ACT:Swap Wallets|SWAP:P0
[78] T78|P5|REV|S2:Checklist
[79] T79|P0|ACT:Payday
[79] T79|PAYDAY|SALARIES:[1,1,1,0,1,1]
[79] T79|P2|FRONTRUNNER_ADD:1|TOTAL:2
[79] T79|P2|FRONTRUNNER_PASS|TO:P1
[79] T79|P0|REV|S0:Payday
[80] T80|P1|PAY_FEE:4|TO:P2
[80] T80|P1|DISC:Write Last Will and Testament|FROM:P2|GAIN:2
[81] T81|P2|PAY_FEE:3|TO:P5
[81] T81|P2|DISC:Checklist|FROM:P5|GAIN:2
[82] T82|P3|ACT:Payday
[82] T82|PAYDAY|SALARIES:[1,1,1,0,1,1]
[82] T82|P1|FRONTRUNNER_ADD:1|TOTAL:3
[82] T82|P1|FRONTRUNNER_PASS|TO:P0
[83] T83|P4|ACT:Payday
[83] T83|PAYDAY|SALARIES:[1,1,1,0,1,1]
[83] T83|P0|FRONTRUNNER_ADD:1|TOTAL:4
[83] T83|P0|FRONTRUNNER_PASS|TO:P5
[83] T83|P5|FRONTRUNNER_ADD:1|TOTAL:5
[83] T83|P5|FRONTRUNNER_PASS|TO:P4
[84] T84|P5|PAY_FEE:4|TO:P2
[84] T84|P5|DISC:Excellent Teamwork|FROM:P2|GAIN:2
[85] T85|P0|ACT:Payday
[85] T85|PAYDAY|SALARIES:[1,1,1,0,1,1]
[85] T85|P4|FRONTRUNNER_PASS|TO:P3
[86] T86|P1|ACT:Bailout
[86] T86|P1|ACT:Bailout|DELTA:[0,2,0,0,0,0]
[87] T87|P2|PAY_FEE:4|TO:P3
[87] T87|P2|DISC:Vehicle Registration Papers|FROM:P3|GAIN:2
[88] T88|P3|ACT:Payday
[88] T88|PAYDAY|SALARIES:[1,1,1,0,1,1]
[88] T88|P3|FRONTRUNNER_PASS|TO:P2
[88] T88|P3|REV|S0:Pandemic / Economic Stimulus
[89] T89|P4|ACT:Blacklisted
[89] T89|P4|ACT:Blacklisted|LOSS:1|KEEP
[90] T90|P5|ACT:Star Power
[90] T90|P5|ACT:Star Power|GAIN:1|KEEP
[91] T91|P0|ACT:Fancy Clothes
[91] T91|P0|KEEP:Fancy Clothes
[92] T92|P1|ACT:Pandemic / Economic Stimulus
[92] T92|ROLL_D6:5
[92] T92|P1|ACT:PANDEMIC_STIMULUS|DELTA:[-5,-5,-5,-5,-5,-5]
[92] T92|P1|REV|S2:Payday
[92] T92|P1|REV|S3:Certificate of Excellence
[93] T93|P2|PAY_FEE:5|TO:P1
[93] T93|P2|DISC:Certificate of Excellence|FROM:P1|GAIN:2
[94] T94|P3|ACT:Philanthropy
[94] T94|P3|ACT:Philanthropy|DELTA:[1,1,1,-6,1,1]
[94] T94|P3|REV|S1:Payday
[94] T94|P3|REV|S2:Enter Luxury Travel Club
[95] T95|P4|PAY_FEE:4|TO:P3
[95] T95|P4|DISC:Enter Luxury Travel Club|FROM:P3|GAIN:2
[95] T95|P4|BLACKLISTED|LOSS:1
[96] T96|P5|ACT:Underdog
[96] T96|P5|ACT:Underdog|LOSS:1|KEEP
[96] T96|P5|UNDERDOG|LOSS:1|PASS_TO:P4
[96] T96|P5|REV|S0:Notebook
[96] T96|P5|REV|S1:Insider
[97] T97|P0|ACT:Payday
[97] T97|PAYDAY|SALARIES:[1,1,1,0,1,1]
[97] T97|P2|FRONTRUNNER_PASS|TO:P1
[97] T97|P0|REV|S1:Payday
[98] T98|P1|ACT:Payday
[98] T98|PAYDAY|SALARIES:[1,1,1,0,1,1]
[98] T98|P1|FRONTRUNNER_PASS|TO:P0
[99] T99|P2|PAY_FEE:5|TO:P5
[99] T99|P2|DISC:Notebook|FROM:P5|GAIN:2
[100] T100|P3|ACT:Payday
[100] T100|PAYDAY|SALARIES:[1,1,1,0,1,1]
[100] T100|P0|FRONTRUNNER_PASS|TO:P5
[100] T100|P5|FRONTRUNNER_PASS|TO:P4
[101] T101|P4|PAY_FEE:5|TO:P1
[101] T101|P4|BLACKLISTED|LOSS:1
[101] T101|P4|ACT:Mental Fog
[101] T101|P4|ACT:Mental Fog|LOSS:1
[102] T102|P5|ACT:Insider
[102] T102|P5|KEEP:Insider
[103] T103|P0|ACT:Payday
[103] T103|PAYDAY|SALARIES:[1,1,1,0,1,2]
[103] T103|P4|FRONTRUNNER_PASS|TO:P3
[104] T104|P1|PAY_FEE:5|TO:P3
[104] T104|P1|ACT:Pandemic / Economic Stimulus
[104] T104|ROLL_D6:2
[104] T104|P1|ACT:PANDEMIC_STIMULUS|DELTA:[2,2,2,2,2,2]
[105] T105|ROLL_D6:4
[105] T105|P2|COLLEGE_APP|ROLL:4|TUITION:9|RES:PASS
[106] T106|ROLL_D6:6
[106] T106|P3|COLLEGE_APP|ROLL:6|TUITION:12|RES:PASS
[107] T107|ROLL_D6:1
[107] T107|P4|COLLEGE_APP|ROLL:1|TUITION:4|RES:PASS
[108] T108|ROLL_D6:1
[108] T108|P5|COLLEGE_APP|ROLL:1|TUITION:2|RES:PASS
[109] T109|P0|ACT:Payday
[109] T109|PAYDAY|SALARIES:[1,1,0,0,0,0]
[109] T109|P3|FRONTRUNNER_PASS|TO:P2
[109] T109|P0|REV|S2:Language Phrasebook
[109] T109|P0|REV|S3:Payday
[110] T110|P1|PAY_FEE:5|TO:P0
[110] T110|P1|DISC:Language Phrasebook|FROM:P0|GAIN:2
[111] T111|ROLL_D6:4
[111] T111|P2|GRAD|ROLL:4|RES:FAIL
[111] T111|ROLL_D6:3
[111] T111|P2|GRAD|ROLL:3|RES:PASS|SALARY_INC:1
[111] T111|ROLL_D6:6
[111] T111|P2|COLLEGE_APP|ROLL:6|TUITION:11|RES:PASS
[112] T112|ROLL_D6:5
[112] T112|P3|GRAD|ROLL:5|RES:FAIL
[112] T112|ROLL_D6:4
[112] T112|P3|GRAD|ROLL:4|RES:FAIL
[112] T112|P3|PAY_FEE:5|TO:P0
[112] T112|P3|ACT:Payday
[112] T112|PAYDAY|SALARIES:[1,1,0,0,0,0]
[112] T112|P2|FRONTRUNNER_PASS|TO:P1
[112] PHASE2_START
[112] PHASE2|P0|TRADE|$28:+8A|PEN_D:-2A|TOTAL_A:7
[112] PHASE2|P1|TRADE|$21:+6A|PEN_D:-3A|TOTAL_A:4
[112] PHASE2|P2|TRADE|$6:+2A|3C:+6A|PEN_D:-2A|TOTAL_A:9
[112] PHASE2|P3|TRADE|PEN_D:-3A|TOTAL_A:-2
[112] PHASE2|P4|TRADE|$18:+6A|PEN_D:-2A|TOTAL_A:5
[112] PHASE2|P5|TRADE|$20:+6A|PEN_D:-3A|TOTAL_A:4
[112] PHASE2|P4|SELECT_LANE:Lane 3|TKN:5
[112] PHASE2|P4|CROSS:PASS|PAID_A:5|REM_A:0
[112] PHASE2|P5|SELECT_LANE:Lane 4|TKN:8
[112] PHASE2|P5|CROSS:FAIL_LOW_A
[112] PHASE2|P0|SELECT_LANE:Lane 1|TKN:7
[112] PHASE2|P0|CROSS:PASS|PAID_A:7|REM_A:0
[112] PHASE2|P1|SELECT_LANE:Lane 4|TKN:4
[112] PHASE2|P1|CROSS:PASS|PAID_A:4|REM_A:0
[112] PHASE2|P2|SELECT_LANE:Lane 1|TKN:6
[112] PHASE2|P2|CROSS:PASS|PAID_A:6|REM_A:3
[112] PHASE2|P3|SELECT_LANE:Lane 1|TKN:7
[112] PHASE2|P3|CROSS:FAIL_LOW_A
[112] GAME_OVER|WINNER: Player 3 (Assurance: 3, Money: $3)
